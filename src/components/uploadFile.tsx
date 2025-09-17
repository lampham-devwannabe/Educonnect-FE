import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'

// Define interface for the component props
interface UploadWidgetProps {
  onUpload: (info: UploadResult) => void
}

// Define interface for upload result
interface UploadResult {
  secure_url: string
  thumbnail_url: string
  public_id: string
}

const UploadWidget: React.FC<UploadWidgetProps> = ({ onUpload }) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [video, setVideo] = useState<string | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      // Check file size (30MB limit)
      if (file.size > 30000000) {
        setError('File size exceeds 30MB limit')
        return
      }

      // Check if it's a video file
      if (!file.type.startsWith('video/')) {
        setError('Please upload a video file')
        return
      }

      setUploading(true)
      setError(null)

      // Create FormData for the API request
      const formData = new FormData()
      formData.append('file', file)

      try {
        // Replace with your own API endpoint for file uploads
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const data = await response.json()

        // Update state with uploaded file info
        setThumbnail(data.thumbnail_url || URL.createObjectURL(file))
        setVideo(data.secure_url)

        // Call the onUpload callback with the result
        onUpload({
          secure_url: data.secure_url,
          thumbnail_url: data.thumbnail_url || URL.createObjectURL(file),
          public_id: data.public_id || file.name,
        })
      } catch (err) {
        console.error('Upload error:', err)
        setError('Failed to upload file. Please try again.')
      } finally {
        setUploading(false)
      }
    },
    [onUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'],
    },
    maxFiles: 1,
  })

  const resetUpload = () => {
    setThumbnail(null)
    setVideo(null)
    setError(null)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Lecture Video</CardTitle>
        <CardDescription>
          Upload your lecture video here. Supported formats are mp4, avi, mov,
          and more. Maximum file size is 30MB.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {thumbnail ? (
            <div className="relative">
              <img
                alt="Video thumbnail"
                className="aspect-video w-full rounded-md object-cover"
                src={thumbnail}
              />
              <button
                onClick={resetUpload}
                className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white hover:bg-black/90"
              >
                <X className="h-4 w-4" />
              </button>
              {video && (
                <div className="mt-2">
                  <video controls className="w-full rounded-md" src={video} />
                </div>
              )}
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-md p-8 text-center hover:bg-gray-50 transition-colors ${
                isDragActive ? 'border-primary bg-gray-50' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center space-y-2">
                <Upload className="h-10 w-10 text-gray-400" />
                <p className="text-sm font-medium">
                  {isDragActive
                    ? 'Drop the video here'
                    : 'Drag & drop your video here or click to browse'}
                </p>
                <p className="text-xs text-gray-500">
                  MP4, AVI, MOV up to 30MB
                </p>
                {error && <p className="text-xs text-red-500">{error}</p>}
                {uploading && (
                  <p className="text-xs text-blue-500">Uploading...</p>
                )}
              </div>
            </div>
          )}

          {thumbnail && (
            <Button onClick={resetUpload} variant="outline" className="mt-2">
              Upload a different video
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default UploadWidget
