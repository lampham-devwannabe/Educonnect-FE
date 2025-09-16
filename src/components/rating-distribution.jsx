'use client'

import { cn } from '../../lib/utils'

export function RatingDistribution({ distribution, className }) {
  // Calculate total reviews
  const totalReviews = Object.values(distribution).reduce(
    (sum, count) => sum + count,
    0
  )

  // Calculate percentages for each rating
  const percentages = {
    5: totalReviews > 0 ? (distribution[5] / totalReviews) * 100 : 0,
    4: totalReviews > 0 ? (distribution[4] / totalReviews) * 100 : 0,
    3: totalReviews > 0 ? (distribution[3] / totalReviews) * 100 : 0,
    2: totalReviews > 0 ? (distribution[2] / totalReviews) * 100 : 0,
    1: totalReviews > 0 ? (distribution[1] / totalReviews) * 100 : 0,
  }

  return (
    <div className={cn('space-y-3', className)}>
      {[5, 4, 3, 2, 1].map(rating => (
        <div key={rating} className="flex items-center gap-3">
          <div className="w-10 text-sm font-medium text-right">
            {rating} star
          </div>

          <div className="relative flex-1 h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className={cn(
                'absolute top-0 left-0 h-full rounded-full',
                rating >= 4
                  ? 'bg-green-500'
                  : rating >= 3
                    ? 'bg-amber-500'
                    : 'bg-red-500'
              )}
              style={{ width: `${percentages[rating]}%` }}
            />
          </div>

          <div className="w-12 text-sm text-muted-foreground">
            {distribution[rating]}
          </div>
        </div>
      ))}
    </div>
  )
}
