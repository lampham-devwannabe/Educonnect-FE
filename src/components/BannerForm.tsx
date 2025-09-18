import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Switch } from './ui/switch'
import toast from 'react-hot-toast'
import { uploadImagePromised } from '../utils/upload-image'
import { Progress } from './ui/progress'

// Define type for banner data
interface BannerData {
  _id?: string
  title: string
  description: string
  image: string
  thumbnail?: string
  link: string
  type: string
  typeValue: string
  isActive: boolean
  position: string | number
}

interface AddEditBannerFormProps {
  bannerData?: BannerData | null
  onSuccess?: () => void
}

export function AddEditBannerForm({
  bannerData = null,
  onSuccess,
}: AddEditBannerFormProps) {
  const navigate = useNavigate() // React Router's navigation hook
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const [formData, setFormData] = useState<BannerData>({
    title: '',
    description: '',
    image: '',
    link: '',
    type: '',
    typeValue: '',
    isActive: true,
    position: '',
  })

  useEffect(() => {
    if (bannerData) {
      setFormData(bannerData)
    }
  }, [bannerData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Set image from thumbnail if available
    if (formData.thumbnail) {
      formData.image = formData.thumbnail
    }

    const method = bannerData ? 'PUT' : 'POST'
    const endpoint = bannerData
      ? `/api/banners/${bannerData._id}`
      : '/api/banners'

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const text = await res.text()
      const data = text ? JSON.parse(text) : {}

      if (data.status === 201 || data.status === 200) {
        toast.success(data.message || 'Banner saved successfully.')
        if (onSuccess) onSuccess()
        navigate('/dashboard/banners')
      } else {
        toast.error(data.message || 'Something went wrong.')
      }
    } catch (error) {
      console.error('Error submitting banner:', error)
      toast.error('An error occurred.')
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    // Check file size (below 800 KB)
    if (file.size > 800 * 1024) {
      alert('File size must be less than 800 KB.')
      return
    }

    try {
      // Use uploadImagePromised instead of uploadImage to get the URL directly
      const imageUrl = await uploadImagePromised(
        file,
        setUploading,
        setUploadProgress
      )

      // Update form data with the new image URL
      setFormData(prevData => ({
        ...prevData,
        image: imageUrl,
        thumbnail: imageUrl,
      }))
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image. Please try again.')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            name="image"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            required={!bannerData}
          />

          {uploading && <Progress value={uploadProgress} className="mt-2" />}
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">Link</Label>
          <Input
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="typeValue">Type Value</Label>
          <Input
            id="typeValue"
            name="typeValue"
            value={formData.typeValue}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            name="position"
            type="number"
            value={formData.position}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="isActive">Active</Label>
        </div>

        <Button type="submit">{bannerData ? 'Update' : 'Add'} Banner</Button>
      </form>

      <div>
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <div className="border rounded-lg overflow-hidden shadow-lg relative bg-gray-100">
          {formData.image ? (
            <img
              src={formData.image}
              alt={formData.title || 'Banner Preview'}
              className="w-full h-40 object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">Image Preview</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center p-4">
            <h4 className="text-xl font-bold text-white text-center">
              {formData.title || 'Banner Title'}
            </h4>
            {formData.description && (
              <p className="mt-2 text-white text-center text-sm">
                {formData.description}
              </p>
            )}
          </div>
          {formData.link && (
            <a
              href={formData.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-2 text-blue-500 hover:text-blue-600 hover:underline bg-white"
            >
              See More
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
