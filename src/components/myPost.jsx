'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table, TableBody } from '@/components/ui/table'

import { Label } from '@/components/ui/label'
import {
  X,
  Search,
  ImagePlus,
  Loader2,
  Heart,
  MessageCircle,
  Share2,
  CrossIcon,
  MoreHorizontal,
  ThumbsUp,
  FileText,
  MessageSquare,
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { usePostHooks } from '@/hooks/usePostHooks'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import toast from 'react-hot-toast'
import { uploadImagePromised } from '@/utils/upload-image'
import Image from 'next/image'
import { useSinglePostHooks } from '@/hooks/useSinglePostHook'

import { useUserDetailsHooks } from '@/hooks/useUserHooks'
import { PostsRightSidebar } from './postsRightSidebar'
import Comment from './comment'
import Swal from 'sweetalert2'

const MyPost = () => {
  const [showComments, setShowComments] = useState(null)

  const { userDetails } = useUserDetailsHooks()

  const [dropdownPostId, setDropdownPostId] = useState(null)

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image: null,
    thumbnail: '',
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
    setFilter,
  } = useSinglePostHooks(userDetails?._id)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0) // Track upload progress
  console.log('setPosts:', setPosts)
  const handleCreatePost = async e => {
    e.preventDefault()
    if (!newPost.title.trim()) return
    if (!newPost.content.trim()) return
    if (isSubmitting) return // Prevent multiple submissions

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

    // Prepare formData for the POST request
    const formData = new FormData()
    formData.append('title', newPost.title)
    formData.append('content', newPost.content)
    console.log(uploadedImageUrl)

    if (uploadedImageUrl) {
      formData.append('image', JSON.stringify([uploadedImageUrl])) // Adjust based on backend expectations
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
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePost = postId => {
    const formData = new FormData()
    formData.append('postId', postId)
    fetch('/api/post-feed/delete', {
      method: 'DELETE',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          // fetchPosts();
          setPosts(previousPosts =>
            previousPosts.filter(post => post._id !== postId)
          )
          toast.success('Post Deletd Successfully')
        } else {
          console.error('Error deleting post:', data.message)
        }
      })
      .catch(error => {
        console.error('Error deleting post:', error)
      })
  }

  const handleBanUser = post => {
    const formData = new FormData()
    formData.append('postid', post._id)
    formData.append('userid', post.user._id)
    fetch('/api/post-feed/ban-post', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          fetchPosts()
        } else {
          console.error('Error banning user:', data.message)
        }
      })
      .catch(error => {
        console.error('Error banning user:', error)
      })
  }

  const handleWarnUser = (userId, message) => {
    const formData = new FormData()
    formData.append('userid', userId)
    formData.append('title', 'Warning Notification')
    formData.append(
      'message',
      message ??
        'You have been warned for violating community guidelines and your post has been removed.'
    )
    formData.append('type', 'Other')
    fetch('/api/notification/user', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          toast.success('User warned successfully')
          fetchPosts()
        } else {
          console.error('Error warning user:', data.message)
        }
      })
      .catch(error => {
        console.error('Error warning user:', error)
      })
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || post.status === filter
    return matchesSearch && matchesFilter
  })

  const onLike = async postId => {
    try {
      const post = posts.find(post => post._id === postId)
      const isLiked = post?.liked || false

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
        setPosts(
          posts.map(post =>
            post._id === postId
              ? { ...post, likes: post.likes + 1, liked: true }
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

  const onShare = postId => {
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

  const [isVisible, setIsVisible] = useState(false)

  const toggleComments = postId => {
    setShowComments(prev => (prev === postId ? null : postId))
  }

  const toggleDiv = () => {
    setIsVisible(prev => !prev)
  }

  return (
    <div className="container mx-auto px-0 pb-8 pt-0">
      <div className="px-6">
        <div className="text-end  flex justify-between items-center">
          <h2 className="text-2xl font-bold ">My Posts</h2>
          {/* <button className="text-gray-600 border px-3 py-1 mb-4 rounded-md font-semibold" onClick={toggleDiv}>
            {isVisible ? 'Hide Add Post' : 'Add New Post'}
          </button> */}
        </div>
        {/* {
          isVisible && (
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
                        onChange={(e) =>
                          setNewPost({ ...newPost, title: e.target.value })
                        }
                        className="mt-1 h-10 resize-none"
                      />
                    </div>
                    <div>
                      <Label htmlFor="content" className="text-lg font-medium">
                        Content:
                      </Label>
                      <Textarea
                        id="content"
                        placeholder="Share your thoughts..."
                        value={newPost.content}
                        onChange={(e) =>
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
                              {newPost.image.type.startsWith("image/") ? (
                                <Image
                                  src={URL.createObjectURL(newPost.image)}
                                  alt="Preview"
                                  width={100}
                                  height={100}
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
                          onChange={(e) =>
                            setNewPost({ ...newPost, image: e.target.files[0] })
                          }
                          accept="image/*,video/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                    {uploading && <Progress value={uploadProgress} />}{" "}

                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || (!newPost.content && !newPost.image)}
                  onClick={handleCreatePost}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Post...
                    </>
                  ) : (
                    "Create Post"
                  )}
                </Button>
              </CardFooter>
            </Card>
          )
        } */}
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
              {/* <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter posts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="removed">Removed</SelectItem>
                </SelectContent>
              </Select> */}
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
                                  <Image
                                    src={URL.createObjectURL(newPost.image)}
                                    alt="Preview"
                                    width={100}
                                    height={100}
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
                            onChange={e =>
                              setNewPost({
                                ...newPost,
                                image: e.target.files[0],
                              })
                            }
                            accept="image/*,video/*"
                            className="hidden"
                          />
                        </div>
                      </div>
                      {uploading && <Progress value={uploadProgress} />}{' '}
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
                    {filteredPosts.map(post => (
                      <article
                        key={post._id}
                        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                      >
                        {/* Header */}
                        <div className="px-4 pt-3 pb-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Image
                                src={post.user?.image || '/default-avatar.png'}
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
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                                onClick={() =>
                                  setDropdownPostId(
                                    dropdownPostId === post._id
                                      ? null
                                      : post._id
                                  )
                                }
                              >
                                <MoreHorizontal className="w-5 h-5" />
                              </button>
                              {dropdownPostId === post._id && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                                  <button
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    onClick={() => {
                                      handleDeletePost(post._id)
                                      setDropdownPostId(null)
                                    }}
                                  >
                                    Delete Post
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

                        {/* Image - Facebook style constrained width */}
                        {post.image?.[0] && (
                          <div className="border-y border-gray-200">
                            <Image
                              src={post.image[0]}
                              alt="Post"
                              width={680}
                              height={510}
                              className="w-full h-auto max-h-[510px] object-contain bg-gray-50"
                            />
                          </div>
                        )}

                        {/* Stats */}
                        <div className="px-4 py-2 border-b border-gray-200 text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span>{post?.totalLikes || 0} likes</span>
                            <span>{post.totalComments || 0} comments</span>
                            {/* <span>{post?.totalShares || 0} shares</span> */}
                          </div>
                        </div>

                        {/* Actions - Facebook style buttons */}
                        <div className="px-2 py-1 grid grid-cols-3 text-gray-500 text-sm font-medium">
                          <button
                            onClick={() => onLike(post._id)}
                            className={`flex items-center justify-center gap-1 p-2 rounded hover:bg-gray-100 ${post?.liked ? 'text-blue-600' : ''}`}
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
                        {showComments === post._id && (
                          <Comment
                            postId={post._id}
                            currentUserId={userDetails._id}
                          />
                        )}
                      </article>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* Right sidebar for ads */}
              <PostsRightSidebar></PostsRightSidebar>
            </div>
          </CardContent>

          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>{(currentPage - 1) * 5 + 1}</strong> to{' '}
              <strong>{(currentPage - 1) * 5 + 5}</strong> Post
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      setCurrentPage(prev => Math.max(prev - 1, 1))
                    }
                  />
                </PaginationItem>
                {[...Array(totalPages).keys()].map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      className="w-5 lg:w-12"
                      onClick={() => setCurrentPage(page + 1)}
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setCurrentPage(prev => Math.min(prev + 1, totalPages))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default MyPost
