import React from 'react'
import { Skeleton } from './ui/skeleton'

interface GlobalSkeletonLoaderProps {
  count?: number
  width?: string | number
  height?: string | number
  textLineCount?: number
  textWidths?: string[]
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
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton
              className="rounded-xl"
              style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
              }}
            />
            <div className="space-y-2">
              {Array(textLineCount)
                .fill(0)
                .map((_, i) => (
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
