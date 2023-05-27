import React from "react";
import { useSkeletonContext } from "./Skeleton.context";
import { YStack, YStackProps } from "tamagui";

type SkeletonItemVariant = "block" | "inline" | "circular";

export type SkeletonItemProps = {
  children: React.ReactNode;
  variant?: SkeletonItemVariant;
} & YStackProps;

const styles = {
  block: {
    alignItems: "stretch",
    borderRadius: "$2",
  },
  inline: {
    alignItems: "flex-start",
    borderRadius: "$2",
  },
  circular: {
    alignItems: "flex-start",
    borderRadius: "$12",
  },
} as const;

export const SkeletonItem = ({
  children,
  variant = "block",
  ...containerProps
}: SkeletonItemProps) => {
  const { alignItems, borderRadius } = styles[variant];
  const { isLoading } = useSkeletonContext();
  return isLoading ? (
    <YStack alignItems={alignItems} {...containerProps}>
      <YStack
        theme="Button"
        backgroundColor="$background"
        borderRadius={borderRadius}
        pointerEvents="none"
      >
        <YStack opacity={0}>{children}</YStack>
      </YStack>
    </YStack>
  ) : (
    <YStack {...containerProps}>{children}</YStack>
  );
};
