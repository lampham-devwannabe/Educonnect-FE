import React from 'react'
import { Skeleton } from './ui/skeleton'

interface GlobalSkeletonLoaderProps {
  count?: number
  width?: string | number
  height?: string | number
  textLineCount?: number
  textWidths?: (string | number)[]
}

const GlobalSkeletonLoader: React.FC<GlobalSkeletonLoaderProps> = ({
  count = 9,
  width = '300px',
  height = '320px',
  textLineCount = 2,
  textWidths = ['250px', '200px'],
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="rounded-xl" style={{ width, height }} />
          <div className="space-y-2">
            {Array.from({ length: textLineCount }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-4"
                style={{ width: textWidths[i] || '200px' }}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default GlobalSkeletonLoader
