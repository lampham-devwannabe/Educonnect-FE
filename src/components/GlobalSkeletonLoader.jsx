// components/GlobalSkeletonLoader.js
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const GlobalSkeletonLoader = ({
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
            <Skeleton className="rounded-xl" style={{ width, height }} />
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
  );
};

export default GlobalSkeletonLoader;
