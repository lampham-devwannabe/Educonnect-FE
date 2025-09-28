import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import {
  Upload,
  X,
  Plus,
  User as UserIcon,
  AtSign,
  Phone,
  Briefcase,
  MapPin,
  Languages,
  Award,
  BookOpen,
  DollarSign,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { User } from '@/models/user'

interface BecomeInstructorModalProps {
  userId: string
  userData?: User
  trigger?: React.ReactNode
}

export default function BecomeInstructorModal({
  userId,
  userData,
  trigger,
}: BecomeInstructorModalProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [previewImage, setPreviewImage] = useState<string | null>(
    userData?.image || null
  )

  // Arrays
  const [expertise, setExpertise] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [certificates, setCertificates] = useState<string[]>([])

  // Form data
  const [formUserData, setformUserData] = useState<User>({
    id: userData?.id || '',
    name: userData?.name || '',
    email: userData?.email || '',
    image: userData?.image || '',
    phone: userData?.phone || '',
    gender: userData?.gender || '',
    profession: '',
    about: '',
    country: '',
    expertise: userData?.expertise || [],
    languages: userData?.languages || [],
    certificates: userData?.certificates || [],
    hourlyRate: userData?.hourlyRate,
  })

  useEffect(() => {
    // Set initial form data
    setformUserData({
      id: userData?.id || '',
      name: userData?.name || '',
      email: userData?.email || '',
      image: userData?.image || '',
      phone: userData?.phone || '',
      gender: userData?.gender || '',
      profession: userData?.profession || '',
      about: userData?.about || '',
      country: userData?.country || '',
      expertise: userData?.expertise || [],
      languages: userData?.languages || [],
      certificates: userData?.certificates || [],
      hourlyRate: userData?.hourlyRate,
    })

    // Set initial array states
    setExpertise(userData?.expertise || [])
    setLanguages(userData?.languages || [])
    setCertificates(userData?.certificates || [])
  }, [userData])

  // Input refs for array fields
  const expertiseInputRef = useRef<HTMLInputElement>(null)
  const languageInputRef = useRef<HTMLInputElement>(null)
  const certificateInputRef = useRef<HTMLInputElement>(null)

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setformUserData(prev => ({ ...prev, [name]: value }))
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setformUserData(prev => ({ ...prev, [name]: value }))
  }

  // Handle array additions
  const addItem = (type: 'expertise' | 'language' | 'certificate') => {
    let inputRef: React.RefObject<HTMLInputElement | null> | null = null
    let value = ''

    if (type === 'expertise') {
      inputRef = expertiseInputRef
      value = inputRef.current?.value || ''
      if (value.trim() && !expertise.includes(value.trim())) {
        setExpertise([...expertise, value.trim()])
      }
    } else if (type === 'language') {
      inputRef = languageInputRef
      value = inputRef.current?.value || ''
      if (value.trim() && !languages.includes(value.trim())) {
        setLanguages([...languages, value.trim()])
      }
    } else if (type === 'certificate') {
      inputRef = certificateInputRef
      value = inputRef.current?.value || ''
      if (value.trim() && !certificates.includes(value.trim())) {
        setCertificates([...certificates, value.trim()])
      }
    }

    if (inputRef?.current) {
      inputRef.current.value = ''
    }
  }

  // Handle array removals
  const removeItem = (
    type: 'expertise' | 'language' | 'certificate',
    item: string
  ) => {
    if (type === 'expertise') {
      setExpertise(expertise.filter(i => i !== item))
    } else if (type === 'language') {
      setLanguages(languages.filter(i => i !== item))
    } else if (type === 'certificate') {
      setCertificates(certificates.filter(i => i !== item))
    }
  }

  // Handle image upload
  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_CLOUD_PRESET || ''
    )
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY || '')

    try {
      setUploading(true)
      const xhr = new XMLHttpRequest()
      xhr.open(
        'POST',
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`
      )

      xhr.upload.onprogress = event => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100
          setUploadProgress(percentComplete)
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText)
          setformUserData(prev => ({ ...prev, image: data.secure_url }))
          setUploading(false)
          setUploadProgress(0)
        } else {
          console.error('Image upload failed: ', xhr.responseText)
          toast.error('Image upload failed')
          setUploading(false)
        }
      }

      xhr.onerror = () => {
        console.error('Image upload failed.')
        toast.error('Image upload failed')
        setUploading(false)
      }

      xhr.send(formData)
    } catch (error) {
      console.error('Image upload failed: ', error)
      toast.error('Image upload failed')
      setUploading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)

      uploadImage(file)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    const requiredFields: Array<keyof User> = [
      'name',
      'email',
      'image',
      'profession',
      'about',
      'country',
    ]

    for (const field of requiredFields) {
      if (!formUserData[field]) {
        toast.error(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        )
        return
      }
    }

    if (expertise.length === 0) {
      toast.error('At least one area of expertise is required')
      return
    }

    if (languages.length === 0) {
      toast.error('At least one language is required')
      return
    }

    if (certificates.length === 0) {
      toast.error('At least one certificate is required')
      return
    }

    setIsSubmitting(true)
    const submitData = new FormData()

    // Add user ID
    submitData.append('userid', userId)

    // Add all form fields
    Object.entries(formUserData).forEach(([key, value]) => {
      if (value !== undefined) {
        submitData.append(
          key,
          typeof value === 'object' ? JSON.stringify(value) : String(value)
        )
      }
    })

    // Add arrays as JSON strings
    submitData.append('expartise', JSON.stringify(expertise))
    submitData.append('language', JSON.stringify(languages))
    submitData.append('certificate', JSON.stringify(certificates))

    try {
      const toastId = toast.loading('Submitting your application...')

      const response = await fetch('/api/user/update/mentor', {
        method: 'POST',
        body: submitData,
      })

      const data = await response.json()
      toast.dismiss(toastId)

      if (response.ok) {
        toast.success('Your application has been submitted successfully!')
        setOpen(false)
        // here reload the page or redirect to another page
        window.location.reload()
      } else {
        toast.error(data.message || 'Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden z-[9999]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Become an Instructor
          </DialogTitle>
          <DialogDescription className="text-center">
            Fill out the form below to apply as an instructor. We&apos;ll review
            your application and get back to you soon.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <UserIcon className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        id="name"
                        name="name"
                        value={formUserData.name}
                        onChange={handleInputChange}
                        className="pl-9"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <AtSign className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formUserData.email}
                        onChange={handleInputChange}
                        className="pl-9"
                        placeholder="Your email address"
                        required
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        value={formUserData.phone}
                        onChange={handleInputChange}
                        className="pl-9"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profession" className="text-sm font-medium">
                    Profession <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Briefcase className="h-4 w-4 text-slate-400" />
                    </div>
                    <Input
                      id="profession"
                      name="profession"
                      value={formUserData.profession}
                      onChange={handleInputChange}
                      className="pl-9"
                      placeholder="e.g., Mathematics Teacher, Software Engineer"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm font-medium">
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin className="h-4 w-4 text-slate-400" />
                    </div>
                    <Input
                      id="country"
                      name="country"
                      value={formUserData.country}
                      onChange={handleInputChange}
                      className="pl-9"
                      placeholder="Your country"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate" className="text-sm font-medium">
                    Hourly Rate <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <DollarSign className="h-4 w-4 text-slate-400" />
                    </div>
                    <Input
                      id="hourlyRate"
                      name="hourlyRate"
                      value={formUserData.hourlyRate?.toString() || ''}
                      onChange={handleInputChange}
                      className="pl-9"
                      required
                      type="number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about" className="text-sm font-medium">
                    About <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="about"
                    name="about"
                    value={formUserData.about}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself, your experience, and teaching style..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-medium">
                    Profile Image <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-shrink-0">
                      {previewImage ? (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-200">
                          <img
                            src={previewImage || '/placeholder.svg'}
                            alt="Profile preview"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-200">
                          <UserIcon className="h-8 w-8 text-slate-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-grow">
                      <label htmlFor="image" className="cursor-pointer">
                        <div className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                          <Upload className="h-4 w-4 text-indigo-500" />
                          <span className="text-sm text-slate-700">
                            {previewImage ? 'Change photo' : 'Upload photo'}
                          </span>
                        </div>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      {uploading && (
                        <div className="mt-2">
                          <Progress value={uploadProgress} className="h-1.5" />
                          <p className="text-xs text-slate-500 mt-1">
                            Uploading: {Math.round(uploadProgress)}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Areas of Expertise */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">
                  Areas of Expertise <span className="text-red-500">*</span>
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <BookOpen className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        ref={expertiseInputRef}
                        placeholder="Add your areas of expertise (e.g., Calculus, Programming)"
                        className="pl-9"
                      />
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addItem('expertise')}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {expertise.map((item, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => removeItem('expertise', item)}
                          className="ml-1 rounded-full hover:bg-indigo-200 p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {expertise.length === 0 && (
                      <p className="text-xs text-slate-500">
                        Add at least one area of expertise
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">
                  Languages <span className="text-red-500">*</span>
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Languages className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        ref={languageInputRef}
                        placeholder="Add languages you speak (e.g., English, Spanish)"
                        className="pl-9"
                      />
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addItem('language')}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {languages.map((item, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 bg-purple-100 text-purple-800 hover:bg-purple-200"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => removeItem('language', item)}
                          className="ml-1 rounded-full hover:bg-purple-200 p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {languages.length === 0 && (
                      <p className="text-xs text-slate-500">
                        Add at least one language
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Certificates */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">
                  Certificates <span className="text-red-500">*</span>
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Award className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        ref={certificateInputRef}
                        placeholder="Add your certificates (e.g., Teaching License, PhD in Mathematics)"
                        className="pl-9"
                      />
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addItem('certificate')}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {certificates.map((item, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 bg-pink-100 text-pink-800 hover:bg-pink-200"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => removeItem('certificate', item)}
                          className="ml-1 rounded-full hover:bg-pink-200 p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {certificates.length === 0 && (
                      <p className="text-xs text-slate-500">
                        Add at least one certificate
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ScrollArea>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
