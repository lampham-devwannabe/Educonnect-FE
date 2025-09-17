import React from 'react'
import { Skeleton } from './ui/skeleton'

interface SkeletonLoadingProps {
  width: string | number
  height: string | number
}

const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({ width, height }) => {
  // Convert numbers to pixel values if needed
  const widthValue = typeof width === 'number' ? `${width}px` : width
  const heightValue = typeof height === 'number' ? `${height}px` : height

  return (
    <Skeleton
      className="rounded-xl"
      style={{
        width: widthValue,
        height: heightValue,
      }}
    />
  )
}

export default SkeletonLoading
