'use client'

import React, { useEffect, useState } from 'react'
import { StarRating } from '@/components/star-rating'
import { RatingDistribution } from '@/components/rating-distribution'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

// Type definitions
interface User {
  name: string
  image?: string
}

interface Review {
  _id: string
  user: User
  rating: number
  review: string
  createdAt: string
  status: string
}

interface ReviewData {
  averageRating: number
  total: number
  mentorReviews: Review[]
}

interface RatingDistribution {
  5: number
  4: number
  3: number
  2: number
  1: number
}

interface MentorReviewsProps {
  mentorId: string
}

const MentorReviews: React.FC<MentorReviewsProps> = ({ mentorId }) => {
  const [reviewData, setReviewData] = useState<ReviewData | undefined>(
    undefined
  )

  const fetchMentorReviewData = async (): Promise<void> => {
    try {
      const formData = new FormData()
      formData.set('mentor', mentorId)
      formData.set('page', '1')
      formData.set('pagination', '10')
      const res = await fetch('/api/mentor/review/all', {
        method: 'POST',
        body: formData,
      })

      const data: ReviewData = await res.json()
      console.log(data)
      setReviewData(data)
    } catch (error) {
      console.error('Error fetching mentor review data:', error)
    }
  }

  useEffect(() => {
    fetchMentorReviewData()
  }, [mentorId])

  const ratingDistribution: { [key: number]: number } = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 1, // Optional: Replace this with dynamic calculation if needed
  }

  return (
    <div className=" dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Mentor Reviews</h1>
          <p className="text-muted-foreground">
            See what students are saying about this mentor
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="col-span-1 shadow-md border-0 overflow-hidden">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 flex flex-col items-center justify-center">
              <h2 className="text-lg font-medium mb-4">Overall Rating</h2>
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold mb-2">
                  {reviewData?.averageRating}
                </div>
                <StarRating
                  rating={reviewData?.averageRating || 0}
                  size="lg"
                  className="mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  Based on {reviewData?.total} review
                  {reviewData?.total !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </Card>

          <Card className="col-span-1 lg:col-span-2 shadow-md border-0">
            <div className="p-6">
              <h2 className="text-lg font-medium mb-4">Rating Distribution</h2>
              <RatingDistribution distribution={ratingDistribution} />
            </div>
          </Card>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Student Feedback{' '}
            <span className="text-muted-foreground">({reviewData?.total})</span>
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <span className="text-sm font-medium">Most Recent</span>
          </div>
        </div>

        {reviewData?.mentorReviews?.length &&
        reviewData.mentorReviews.length > 0 ? (
          <div className="space-y-6">
            {reviewData.mentorReviews.map((review: Review) => (
              <Card
                key={review._id}
                className="shadow-sm hover:shadow-md transition-shadow duration-200 border-0"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex flex-col items-center md:items-start gap-2">
                        <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                          <AvatarImage
                            src={review.user.image || '/placeholder.svg'}
                            alt={review.user.name}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {review.user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center md:text-left">
                          <h3 className="font-medium">{review.user.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(review.createdAt), 'MMMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <StarRating rating={review.rating} />
                        <Badge variant="outline" className="font-medium">
                          {review.rating.toFixed(1)}
                        </Badge>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {review.review}
                      </p>

                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <div className="flex gap-4">
                          <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                            👍 Helpful
                          </button>
                          <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                            🚩 Report
                          </button>
                        </div>

                        {review.status === 'active' && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Session
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-sm border-0 bg-white dark:bg-gray-800">
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">💬</div>
              <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
              <p className="text-muted-foreground max-w-md">
                Be the first to share your experience with this mentor and help
                others make an informed decision.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default MentorReviews
