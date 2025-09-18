/**
 * Interface for the image object
 */
interface ImageObject {
  thumbnail: string
  [key: string]: any
}

/**
 * Uploads an image to Cloudinary with progress tracking
 *
 * @param file - The file to upload
 * @param setUploading - State setter for the uploading status
 * @param setUploadProgress - State setter for the upload progress
 * @param setImage - State setter for the image object
 * @param image - Current image object
 */
export const uploadImage = async (
  file: File,
  setUploading: (uploading: boolean) => void,
  setUploadProgress: (progress: number) => void,
  setImage: (image: ImageObject) => void,
  image: ImageObject
): Promise<void> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''
  )
  formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY || '')

  try {
    setUploading(true)
    const xhr = new XMLHttpRequest()
    xhr.open(
      'POST',
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`
    )

    xhr.upload.onprogress = (event: ProgressEvent) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100
        setUploadProgress(percentComplete)
      }
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText)
        setImage({ ...image, thumbnail: data.secure_url })
        setUploading(false)
        setUploadProgress(0) // Reset progress bar
      } else {
        console.error('Image upload failed: ', xhr.responseText)
        setUploading(false)
      }
    }

    xhr.onerror = () => {
      console.error('Image upload failed.')
      setUploading(false)
    }

    xhr.send(formData)
  } catch (error) {
    console.error('Image upload failed: ', error)
    setUploading(false)
  }
}

/**
 * Uploads an image to Cloudinary and returns a promise with the URL
 *
 * @param file - The file to upload
 * @param setUploading - State setter for the uploading status
 * @param setUploadProgress - State setter for the upload progress
 * @returns A promise that resolves to the uploaded image URL
 */
export const uploadImagePromised = async (
  file: File,
  setUploading: (uploading: boolean) => void,
  setUploadProgress: (progress: number) => void
): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''
  )
  formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY || '')

  return new Promise<string>((resolve, reject) => {
    try {
      setUploading(true)
      const xhr = new XMLHttpRequest()
      xhr.open(
        'POST',
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`
      )

      xhr.upload.onprogress = (event: ProgressEvent) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100
          setUploadProgress(percentComplete)
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText)
          setUploading(false)
          setUploadProgress(0) // Reset progress bar
          resolve(data.secure_url) // Resolve with the image URL
        } else {
          setUploading(false)
          reject(new Error(`Image upload failed: ${xhr.responseText}`))
        }
      }

      xhr.onerror = () => {
        setUploading(false)
        reject(new Error('Image upload failed due to a network error.'))
      }

      xhr.send(formData)
    } catch (error) {
      setUploading(false)
      reject(error)
    }
  })
}

/**
 * Fetches a signature for secure Cloudinary upload (optional enhancement)
 *
 * @returns A promise that resolves to the signature object
 */
export const getUploadSignature = async (): Promise<{
  signature: string
  timestamp: string
}> => {
  try {
    const response = await fetch('/api/cloudinary-signature', {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to get upload signature')
    }

    return await response.json()
  } catch (error) {
    console.error('Error getting upload signature:', error)
    throw error
  }
}
