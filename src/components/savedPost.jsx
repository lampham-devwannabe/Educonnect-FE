'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  Bookmark,
  MessageSquare,
  MoreHorizontal,
  Share2,
  ThumbsUp,
} from 'lucide-react'
import { CardContent } from './ui/card'
import { useUserDetailsHooks } from '@/hooks/useUserHooks'
const SavedPost = () => {
  const [savedPost, setSavedPost] = useState([])
  const { userDetails } = useUserDetailsHooks()

  const [dropdownId, setDropdownId] = useState(null)
  const [isBookmarked, setIsBookedmarked] = useState(false)

  const handleBookmark = async postId => {
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
        // setIsBookedmarked(!isBookmarked)
        setSavedPost(prevPosts =>
          prevPosts.filter(post => post && post._id !== postId)
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchSavedPost = async () => {
    const formData = new FormData()
    formData.append('userId', userDetails._id)

    try {
      const response = await fetch('/api/post-feed/bookmark/list', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      setSavedPost(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (userDetails && userDetails._id) {
      fetchSavedPost()
    }
  }, [userDetails])

  return (
    <div>
      <h4 className="font-bold text-2xl pb-5">Saved Posts</h4>
      <div className="flex-1 max-w-[680px] mx-auto">
        <CardContent className="p-0">
          <div className="grid gap-4">
            {savedPost.map(post => {
              if (!post || !post.content) return null
              return (
                <article
                  key={post?._id || Math.random()}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                >
                  {/* Header */}
                  <div className="px-4 pt-3 pb-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post?.user?.image || '/default-avatar.png'}
                          alt="Avatar"
                          width={40}
                          height={40}
                          className="rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {post?.user?.name || 'Unknown'}
                          </h3>
                        </div>
                      </div>

                      <div className="relative inline-block text-left">
                        <button
                          onClick={() =>
                            setDropdownId(
                              dropdownId === post._id ? 'null' : post._id
                            )
                          }
                          className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        {dropdownId === post._id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border rounded"
                              onClick={() => {
                                handleBookmark(post._id)
                              }}
                            >
                              Delete Bookmark
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 py-2">
                    <p className="text-gray-800 text-base">{post.content}</p>
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
                      <span>{post?.likes || 0} likes</span>
                      <span>{post.comments?.length || 0} comments</span>
                      <span>{post?.shares || 0} shares</span>
                    </div>
                  </div>

                  {/* Actions - Facebook style buttons */}
                  <div className="px-2 py-1 grid grid-cols-3 text-gray-500 text-sm font-medium">
                    <button
                      className={`flex items-center justify-center gap-1 p-2 rounded hover:bg-gray-100 ${post?.liked ? 'text-blue-600' : ''}`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Like
                    </button>
                    <button className="flex items-center justify-center gap-1 p-2 rounded hover:bg-gray-100">
                      <MessageSquare className="w-4 h-4" />
                      Comment
                    </button>
                    <button className="flex items-center justify-center gap-1 p-2 rounded hover:bg-gray-100">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </CardContent>
      </div>
    </div>
  )
}

export default SavedPost
