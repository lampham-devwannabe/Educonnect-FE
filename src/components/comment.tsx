'use client'
import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Separator } from './ui/separator'
import { ChevronDown, ChevronUp, Send, MessageSquare } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { User } from '@/models/user'

interface Reply {
  _id: string
  user: User
  reply: string
  createdAt: string
}

interface CommentType {
  _id: string
  user: User
  comment: string
  createdAt: string
  replies: Reply[]
}

interface CommentProps {
  postId: string
  currentUserId: string
}

interface ExpandedCommentsState {
  [key: string]: boolean
}

const Comment: React.FC<CommentProps> = ({ postId, currentUserId }) => {
  const [comments, setComments] = useState<CommentType[]>([])
  const [newComment, setNewComment] = useState<string>('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState<string>('')
  const [expandedComments, setExpandedComments] =
    useState<ExpandedCommentsState>({})
  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    const fetchComments = async (): Promise<void> => {
      const formData = new FormData()
      formData.append('postid', postId)

      const res = await fetch('/api/post-feed/comment-list', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (data?.data?.comments) {
        setComments(data.data.comments)
        const initExpand: ExpandedCommentsState = {}
        data.data.comments.forEach((c: CommentType) => {
          if (c.replies?.length > 0) initExpand[c._id] = false
        })
        setExpandedComments(initExpand)
      }
    }
    fetchComments()
  }, [postId, refresh])

  const handleAddComment = async (): Promise<void> => {
    if (!newComment.trim()) return

    const formdata = new FormData()
    formdata.append('postid', postId)
    formdata.append('userid', currentUserId)
    formdata.append('comment', newComment)

    await fetch('/api/post-feed/comment', {
      method: 'POST',
      body: formdata,
    })
    setNewComment('')
    setRefresh(!refresh)
  }

  const handleAddReply = async (commentId: string): Promise<void> => {
    const formdata = new FormData()
    formdata.append('postid', postId)
    formdata.append('userid', currentUserId)
    formdata.append('replyToCommentId', commentId)
    formdata.append('reply', replyText)

    await fetch('/api/post-feed/comment', {
      method: 'POST',
      body: formdata,
    })

    setReplyText('')
    setReplyingTo(null)
    setRefresh(!refresh)
  }

  const toggleReplies = (commentId: string): void => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 md:p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Comments ({comments.length})</h2>
          </div>

          <div className="mb-6">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Current User"
                />
                <AvatarFallback>CU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  id="comment-input"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  className="min-h-[80px] mb-2"
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddComment} className="gap-2">
                    <Send className="h-4 w-4" />
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment._id} className="group">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border mt-0.5">
                    <AvatarImage
                      src={
                        comment.user.image ||
                        '/placeholder.svg?height=40&width=40'
                      }
                      alt={comment.user.name}
                    />
                    <AvatarFallback>
                      {comment.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{comment.user.name}</h3>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      <p className="text-gray-700">{comment.comment}</p>
                    </div>

                    <div className="flex items-center gap-4 mt-1 ml-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setReplyingTo(
                            replyingTo === comment._id ? null : comment._id
                          )
                        }
                        className="text-gray-500 hover:text-gray-700 p-0 h-auto text-xs"
                      >
                        Reply
                      </Button>

                      {comment.replies.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleReplies(comment._id)}
                          className="text-gray-500 hover:text-gray-700 p-0 h-auto flex items-center gap-1 text-xs"
                        >
                          {expandedComments[comment._id] ? (
                            <>
                              <ChevronUp className="h-3 w-3" />
                              Hide replies
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3 w-3" />
                              Show {comment.replies.length}{' '}
                              {comment.replies.length === 1
                                ? 'reply'
                                : 'replies'}
                            </>
                          )}
                        </Button>
                      )}
                    </div>

                    {replyingTo === comment._id && (
                      <div className="mt-3 ml-1">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8 border">
                            <AvatarImage
                              src="/placeholder.svg?height=32&width=32"
                              alt="Current User"
                            />
                            <AvatarFallback>CU</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Textarea
                              placeholder="Write a reply..."
                              value={replyText}
                              onChange={e => setReplyText(e.target.value)}
                              className="min-h-[60px] mb-2 text-sm"
                            />
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setReplyingTo(null)
                                  setReplyText('')
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleAddReply(comment._id)}
                                className="gap-1"
                                disabled={!replyText.trim()}
                              >
                                <Send className="h-3 w-3" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {expandedComments[comment._id] &&
                      comment.replies.length > 0 && (
                        <div className="mt-3 ml-6 space-y-3">
                          {comment.replies.map(reply => (
                            <div
                              key={reply._id}
                              className="flex items-start gap-3"
                            >
                              <Avatar className="h-8 w-8 border mt-0.5">
                                <AvatarImage
                                  src={
                                    reply.user.image ||
                                    '/placeholder.svg?height=32&width=32'
                                  }
                                  alt={reply.user.name}
                                />
                                <AvatarFallback>
                                  {reply.user.name
                                    .substring(0, 2)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-medium text-sm">
                                      {reply.user.name}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                      {formatDistanceToNow(
                                        new Date(reply.createdAt),
                                        { addSuffix: true }
                                      )}
                                    </p>
                                  </div>
                                  <p className="text-sm text-gray-700">
                                    {reply.reply}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>

                <Separator className="my-6" />
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <div className="text-center py-10">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment
