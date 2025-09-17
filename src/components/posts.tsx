import React, { useState, useEffect } from 'react'
import {
  X,
  Search,
  ImagePlus,
  Loader2,
  Share2,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

// Import UI components
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Progress } from './ui/progress'
import GlobalPagination from './GlobalPagination'
import GlobalSkeletonLoader from './GlobalSkeletonLoader'
import Comment from './comment'
import { PostsRightSidebar } from './postsRightSidebar'

// TypeScript interfaces
interface User {
  _id: string
  name: string
  image?: string
}

interface Post {
  _id: string
  title: string
  content: string
  image?: string[]
  user: User
  createdAt: string
  totalLikes: number
  totalComments: number
  userLiked?: boolean
  bookmarked?: boolean
  liked?: boolean
  status?: string
}

interface NewPostState {
  title: string
  content: string
  image: File | null
  thumbnail: string | null
}

// Custom hook for post functionality
const usePostHooks = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState<boolean>(true)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/post-feed?page=${currentPage}`)
      const data = await response.json()

      if (response.ok) {
        setPosts(data.posts)
        setTotalPages(data.totalPages || 1)
      } else {
        console.error('Failed to fetch posts:', data.message)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [currentPage])

  return {
    posts,
    setPosts,
    fetchPosts,
    currentPage,
    setCurrentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    loading,
  }
}

// Custom hook for user details
const useUserDetailsHooks = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/user/profile')
        const data = await response.json()

        if (response.ok) {
          setUserDetails(data.user)
        }
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    fetchUserDetails()
  }, [])

  return { userDetails }
}

// Image upload utility function
const uploadImagePromised = (
  file: File,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    setUploading(true)
    setUploadProgress(0)

    const formData = new FormData()
    formData.append('file', file)

    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', event => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100)
        setUploadProgress(progress)
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText)
        setUploading(false)
        resolve(response.url)
      } else {
        setUploading(false)
        reject(new Error('Upload failed'))
      }
    })

    xhr.addEventListener('error', () => {
      setUploading(false)
      reject(new Error('Upload failed'))
    })

    xhr.open('POST', '/api/upload', true)
    xhr.send(formData)
  })
}

const AllPosts: React.FC = () => {
  const [showComments, setShowComments] = useState<string | null>(null)
  const [dropdownId, setDropdownId] = useState<string | null>(null)
  const { userDetails } = useUserDetailsHooks()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [newPost, setNewPost] = useState<NewPostState>({
    title: '',
    content: '',
    image: null,
    thumbnail: null,
  })

  const {
    posts,
    setPosts,
    fetchPosts,
    currentPage,
    setCurrentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    filter,
    loading,
  } = usePostHooks()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const toggleComments = (postId: string) => {
    setShowComments(prev => (prev === postId ? null : postId))
  }

  const handleBookmark = async (postId: string) => {
    if (!userDetails) {
      toast.error('Please login to bookmark posts')
      return
    }

    const formdata = new FormData()
    formdata.append('userId', userDetails._id)
    formdata.append('postId', postId)

    try {
      const response = await fetch('/api/post-feed/bookmark', {
        method: 'POST',
        body: formdata,
      })
      const data = await response.json()

      if (data.status === 200 || data.status === 201) {
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId
              ? { ...post, bookmarked: !post.bookmarked }
              : post
          )
        )
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to bookmark post')
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.title.trim()) return
    if (!newPost.content.trim()) return
    if (isSubmitting) return

    setIsSubmitting(true)

    let uploadedImageUrl = null

    if (newPost.image) {
      try {
        uploadedImageUrl = await uploadImagePromised(
          newPost.image,
          setUploading,
          setUploadProgress
        )
      } catch (error) {
        console.error('Image upload failed:', error)
        toast.error('Image upload failed. Please try again.')
        setIsSubmitting(false)
        return
      }
    }

    const formData = new FormData()
    formData.append('title', newPost.title)
    formData.append('content', newPost.content)

    if (uploadedImageUrl) {
      formData.append('image', JSON.stringify([uploadedImageUrl]))
    }

    try {
      const response = await fetch('/api/post-feed/add-new', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (response.ok) {
        toast.success('Post created successfully')
        setNewPost({ title: '', content: '', image: null, thumbnail: null })
        fetchPosts()
      } else {
        toast.error(`Failed to create post: ${data.message}`)
      }
    } catch (error) {
      console.error('Error creating post:', error)
      toast.error('Failed to create post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || post.status === filter
    return matchesSearch && matchesFilter
  })

  const onLike = async (postId: string) => {
    if (!userDetails) {
      toast.error('Please login to like posts')
      return
    }

    try {
      const response = await fetch(`/api/post-feed/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postid: postId,
          userid: userDetails._id,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        const { liked, likes } = result.data

        setPosts(
          posts.map(post =>
            post._id === postId
              ? { ...post, totalLikes: likes, userLiked: liked }
              : post
          )
        )
      } else {
        const errorData = await response.json()
        console.error('Failed to like the post:', errorData.message)
      }
    } catch (error) {
      console.error('Error liking the post:', error)
    }
  }

  const onShare = (postId: string) => {
    const url = `${window.location.origin}/popular-post/page?id=${postId}`
    navigator.clipboard
      .writeText(url)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Link Copied!',
          text: 'You can now share it anywhere.',
          timer: 2000,
          showConfirmButton: false,
        })
      })
      .catch(error => {
        console.error('Failed to copy: ', error)
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Failed to copy the link.',
        })
      })
  }

  const toggleDiv = () => {
    setIsVisible(prev => !prev)
  }

  return (
    <div className="container mx-auto px-0 pb-8 pt-0">
      <div className="px-6">
        <div className="text-end flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Community Posts</h2>
        </div>
      </div>
      <div>
        <Card className="w-full border-0">
          <CardHeader>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              </div>
              <button
                className="text-gray-600 border px-3 py-1 mb-4 rounded-md font-semibold"
                onClick={toggleDiv}
              >
                {isVisible ? 'Hide Add Post' : 'Add New Post'}
              </button>
            </div>
            {isVisible && (
              <Card className="w-full mx-auto mb-5">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-center">
                    Create New Post
                  </h2>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreatePost}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-lg font-medium">
                          Title:
                        </Label>
                        <Input
                          id="title"
                          placeholder="Enter post title..."
                          value={newPost.title}
                          onChange={e =>
                            setNewPost({ ...newPost, title: e.target.value })
                          }
                          className="mt-1 h-10 resize-none"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="content"
                          className="text-lg font-medium"
                        >
                          Content:
                        </Label>
                        <Textarea
                          id="content"
                          placeholder="Share your thoughts..."
                          value={newPost.content}
                          onChange={e =>
                            setNewPost({ ...newPost, content: e.target.value })
                          }
                          className="mt-1 h-32 resize-none"
                        />
                      </div>
                      <div>
                        <Label htmlFor="image" className="text-lg font-medium">
                          Add Photos/Videos:
                        </Label>
                        <div className="mt-1 flex items-center space-x-2">
                          <Label
                            htmlFor="image"
                            className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                          >
                            {newPost.image ? (
                              <div className="relative w-full h-full">
                                {newPost.image.type.startsWith('image/') ? (
                                  <img
                                    src={URL.createObjectURL(newPost.image)}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                ) : (
                                  <video
                                    src={URL.createObjectURL(newPost.image)}
                                    className="w-full h-full object-cover rounded-md"
                                    controls
                                  />
                                )}
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-1 right-1"
                                  onClick={() =>
                                    setNewPost({ ...newPost, image: null })
                                  }
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <span className="flex items-center space-x-2">
                                <ImagePlus className="w-6 h-6 text-gray-600" />
                                <span className="font-medium text-gray-600">
                                  Click to upload
                                </span>
                              </span>
                            )}
                          </Label>
                          <Input
                            id="image"
                            type="file"
                            onChange={e => {
                              const files = e.target.files
                              if (files && files.length > 0) {
                                setNewPost({
                                  ...newPost,
                                  image: files[0],
                                })
                              }
                            }}
                            accept="image/*,video/*"
                            className="hidden"
                          />
                        </div>
                      </div>
                      {uploading && <Progress value={uploadProgress} />}
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      isSubmitting || (!newPost.content && !newPost.image)
                    }
                    onClick={handleCreatePost}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Post...
                      </>
                    ) : (
                      'Create Post'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </CardHeader>
          <CardContent>
            <div className="max-w-[1000px] mx-auto px-0 flex gap-5">
              <div className="flex-1 max-w-[680px] mx-auto">
                <CardContent className="p-0">
                  <div className="grid gap-4">
                    {loading ? (
                      <GlobalSkeletonLoader
                        count={5}
                        width="100%"
                        height="80px"
                        textLineCount={2}
                        textWidths={['80%', '60%']}
                      />
                    ) : filteredPosts.length === 0 ? (
                      <div className="text-center py-10">No posts found</div>
                    ) : (
                      filteredPosts.map(post => (
                        <article
                          key={post._id}
                          className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                        >
                          {/* Header */}
                          <div className="px-4 pt-3 pb-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <img
                                  src={
                                    post.user?.image || '/default-avatar.png'
                                  }
                                  alt="Avatar"
                                  width={40}
                                  height={40}
                                  className="rounded-full object-cover border border-gray-200"
                                />
                                <div>
                                  <h3 className="text-sm font-semibold text-gray-900">
                                    {post.user?.name || 'Unknown'}
                                  </h3>
                                  <p className="text-xs text-gray-500">
                                    {new Date(post.createdAt).toLocaleString(
                                      'en-US',
                                      {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      }
                                    )}
                                  </p>
                                </div>
                              </div>

                              <div className="relative inline-block text-left">
                                <button
                                  onClick={() =>
                                    setDropdownId(
                                      dropdownId === post._id ? null : post._id
                                    )
                                  }
                                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                                >
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>

                                {dropdownId === post._id && (
                                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                                    <button
                                      onClick={() => handleBookmark(post._id)}
                                      className={`block w-full text-left px-4 py-2 text-sm border rounded ${
                                        post.bookmarked
                                          ? 'text-green-600 bg-green-50 hover:bg-green-100'
                                          : 'text-blue-600 hover:bg-gray-100'
                                      }`}
                                    >
                                      {post.bookmarked
                                        ? 'Bookmarked'
                                        : 'Bookmark'}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="px-4 py-2">
                            <p className="text-gray-800 text-base">
                              {post.content}
                            </p>
                          </div>

                          {/* Image */}
                          {post.image && post.image[0] && (
                            <div
                              className="border-y border-gray-200 cursor-pointer"
                              onClick={() => setSelectedImage(post.image![0])}
                            >
                              <img
                                src={post.image[0]}
                                alt="Post"
                                className="w-full h-auto max-h-[510px] object-contain bg-gray-50"
                              />
                            </div>
                          )}

                          {/* Stats */}
                          <div className="px-4 py-2 border-b border-gray-200 text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <span>{post?.totalLikes || 0} likes</span>
                              <span>{post.totalComments || 0} comments</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="px-2 py-1 grid grid-cols-3 text-gray-500 text-sm font-medium">
                            <button
                              onClick={() => onLike(post._id)}
                              className={`flex items-center justify-center gap-1 p-2 rounded hover:bg-gray-100 ${post?.userLiked ? 'text-blue-600' : ''}`}
                            >
                              <ThumbsUp className="w-4 h-4" />
                              Like
                            </button>
                            <button
                              onClick={() => toggleComments(post._id)}
                              className="flex items-center justify-center gap-1 p-2 rounded hover:bg-gray-100"
                            >
                              <MessageSquare className="w-4 h-4" />
                              Comment
                            </button>

                            <button
                              onClick={() => onShare(post._id)}
                              className="flex items-center justify-center gap-1 p-2 rounded hover:bg-gray-100"
                            >
                              <Share2 className="w-4 h-4" />
                              Share
                            </button>
                          </div>
                          {showComments === post._id && userDetails && (
                            <Comment
                              postId={post._id}
                              currentUserId={userDetails._id}
                            />
                          )}
                        </article>
                      ))
                    )}
                  </div>
                </CardContent>
              </div>

              {/* Right sidebar for ads */}
              <PostsRightSidebar />
            </div>
          </CardContent>
          {filteredPosts.length > 0 && (
            <GlobalPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalPages * 10}
              currentPageDataLength={filteredPosts.length}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          )}
        </Card>
      </div>

      {/* Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-auto h-auto mt-12"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedImage}
              alt="Zoomed"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AllPosts
