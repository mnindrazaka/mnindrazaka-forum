import { Forward, Gift, MessageSquare } from "@tamagui/lucide-icons";
import React from "react";
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
    <XStack space="$3" {...containerProps}>
      <Button icon={MessageSquare} onPress={onCommentButtonPress} size="$3">
        {`${commentCount} Comments`}
      </Button>
      <Button icon={Gift} size="$3">
        Awards
      </Button>
      <Button icon={Forward} size="$3">
        Share
      </Button>
    </XStack>
  );
}
