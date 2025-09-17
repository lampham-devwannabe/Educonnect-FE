import React from 'react'
import { Star, StarHalf } from 'lucide-react'
import { cn } from '../lib/utils'

type StarSize = 'sm' | 'md' | 'lg'

interface StarRatingProps {
  rating: number
  size?: StarSize
  className?: string
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 'md',
  className,
}) => {
  const normalizedRating = Math.min(Math.max(rating, 0), 5)

  const fullStars = Math.floor(normalizedRating)
  const hasHalfStar = normalizedRating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  const starSizes: Record<StarSize, string> = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const starSize = starSizes[size]

  return (
    <div className={cn('flex', className)}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className={cn(starSize, 'fill-amber-400 text-amber-400')}
        />
      ))}

      {hasHalfStar && (
        <StarHalf className={cn(starSize, 'fill-amber-400 text-amber-400')} />
      )}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={cn(starSize, 'text-gray-200 dark:text-gray-700')}
        />
      ))}
    </div>
  )
}

export default StarRating
