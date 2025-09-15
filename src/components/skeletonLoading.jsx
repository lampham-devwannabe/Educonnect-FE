import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const SkeletonLoading = ({width, height }) => {
  return <Skeleton className={`h-[${height}] w-[${width}] rounded-xl`} />;
};

export default SkeletonLoading;
