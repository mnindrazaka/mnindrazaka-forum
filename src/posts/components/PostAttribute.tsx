import React from "react";
import { SkeletonItem } from "@/uikits";
import { Forward, Gift, MessageSquare } from "@tamagui/lucide-icons";
import { Button, XStack, XStackProps } from "tamagui";

export type PostAttributeProps = {
  commentCount: number;
  onCommentButtonPress?: () => void;
} & XStackProps;

export function PostAttribute({
  commentCount,
  onCommentButtonPress,
  ...containerProps
}: PostAttributeProps) {
  return (
    <XStack {...containerProps} flexWrap="wrap" gap="$3">
      <SkeletonItem>
        <Button icon={MessageSquare} onPress={onCommentButtonPress} size="$3">
          {`${commentCount} Comments`}
        </Button>
      </SkeletonItem>

      <SkeletonItem>
        <Button icon={Gift} size="$3">
          Awards
        </Button>
      </SkeletonItem>

      <SkeletonItem>
        <Button icon={Forward} size="$3">
          Share
        </Button>
      </SkeletonItem>
    </XStack>
  );
}
