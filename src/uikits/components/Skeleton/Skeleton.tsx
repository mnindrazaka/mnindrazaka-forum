import React from "react";
import { SkeletonContext } from "./Skeleton.context";

export type SkeletonProps = {
  isLoading?: boolean;
  children: React.ReactNode;
};

export function Skeleton({ isLoading = false, children }: SkeletonProps) {
  return (
    <SkeletonContext.Provider value={{ isLoading }}>
      {children}
    </SkeletonContext.Provider>
  );
}
