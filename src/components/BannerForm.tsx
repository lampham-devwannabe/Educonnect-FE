'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import toast from 'react-hot-toast'
import { uploadImage } from '@/utils/upload-image'
import { Progress } from '@/components/ui/progress'
import { from } from 'form-data'
import NextImage from 'next/image'

export function AddEditBannerForm({ bannerData = null, onSuccess }) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [formData, setFormData] = useState({
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

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = checked => {
    setFormData(prev => ({ ...prev, isActive: checked }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    formData.image = formData.thumbnail
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
      // if (res.ok) {
      //   toast.success(data.message || "Banner saved successfully.");
      //   onSuccess?.();
      //   router.push("/dashboard/banners");
      // } else {
      //   toast.error(data.message || "Something went wrong.");
      // }

      if (data.status === 201 || data.status === 200) {
        toast.success(data.message)
        onSuccess?.()
        router.push('/dashboard/banners')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error submitting banner:', error)
      toast.error('An error occurred.')
    }
  }

  const handleFileChange = e => {
    const file = e.target.files[0]

    if (file) {
      // Check file size (below 100 KB)
      if (file.size > 800 * 1024) {
        alert('File size must be less than 500 KB.')
        return
      }

      const img = new Image()
      const reader = new FileReader()

      reader.onload = event => {
        img.src = event.target.result
        img.onload = () => {
          uploadImage(
            file,
            setUploading,
            setUploadProgress,
            setFormData,
            formData
          )
        }
        // img.onload = () => {
        //   if (img.width !== 1600 || img.height !== 500) {
        //     alert("Image dimensions must be 1600 x 500 pixels.");
        //   } else {
        //     // If validation passes, proceed to upload
        //     uploadImage(file, setUploading, setUploadProgress, setFormData, formData);

        //   }
        // };
      }

      reader.readAsDataURL(file)
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
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="image"
            name="image"
            type="file"
            onChange={handleFileChange}
            required
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
          {formData.imageUrl ? (
            <NextImage
              src={formData.imageUrl}
              alt={formData.title || 'Banner Preview'}
              height={160}
              width={800}
              className="w-full h-40 object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-gray-300 flex items-center justify-center"></div>
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
