'use client'
import { CldUploadWidget, CldVideoPlayer } from 'next-cloudinary'
import { useState } from 'react'
import Image from 'next/image'
import { Upload } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
const UploadWidget = ({ onUpload }) => {
  const [thumbnail, setthumbnail] = useState(null)
  const [video, setvideo] = useState(null)
  return (
    <CldUploadWidget
      options={{
        sources: ['local', 'google_drive', 'facebook'],
        multiple: false,
        maxVideoFileSize: 30000000,
        resourceType: 'video',
      }}
      signatureEndpoint="/api/uploadimage"
      onSuccess={(result, { widget }) => {
        if (onUpload) {
          onUpload(result?.info)
          setthumbnail(result?.info?.thumbnail_url)
          setvideo(result?.info?.secure_url)
        }
        widget.close()
      }}
    >
      {({ open }) => (
        // <div className="flex relative">
        //   <label
        //     title="Click to upload"
        //     for="button2"
        //     className="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
        //   >
        //     <div className="w-max relative">
        //       <img
        //         className="w-12"
        //         src={thumbnail===null? "https://www.svgrepo.com/show/485545/upload-cicle.svg":thumbnail}
        //         alt="file upload icon"
        //         width="512"
        //         height="512"
        //       />
        //     </div>
        //     <div className="relative">
        //       <span className="block text-base font-semibold relative text-blue-900 group-hover:text-blue-500">
        //         {thumbnail===null?"Upload a file":"Uploaded Successfully!"}
        //       </span>
        //       <span className="mt-0.5 block text-sm text-gray-500">Max 30 MB</span>
        //     </div>
        //   </label>
        //   <button
        //     hidden=""
        //     onClick={(e) => {
        //       e.preventDefault();
        //       open();
        //     }}
        //     name="button2"
        //     id="button2"
        //   />
        // </div>

        <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
          <CardHeader>
            <CardTitle>Lecture Video</CardTitle>
            <CardDescription>
              Upload your lecture video here. Supported formats are mp4, avi,
              mov, and more. Maximum file size is 30MB.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="300"
                src={thumbnail === null ? '/assets/placeholder.jpg' : thumbnail}
                width="300"
              />
              <div className="grid grid-cols-3 gap-2">
                <button>
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="84"
                    src="/assets/placeholder.jpg"
                    width="84"
                  />
                </button>
                <button
                  onClick={e => {
                    e.preventDefault()
                    open()
                  }}
                  className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                >
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Upload</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </CldUploadWidget>
  )
}

export default UploadWidget
