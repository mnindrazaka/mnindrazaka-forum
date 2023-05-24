import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import React from "react";
import { Button, H3, Paragraph, XStack, XStackProps, YStack } from "tamagui";
import { PostAttribute } from "./PostAttribute";
import dayjs from "dayjs";

export type PostCardProps = {
  voteCount: number;
  onVoteUpPress: () => void;
  onVoteDownPress: () => void;
  title: string;
  datetime: string;
  commentCount: number;
  onCommentButtonPress: () => void;
} & XStackProps;

export function PostCard({
  voteCount,
  onVoteUpPress,
  onVoteDownPress,
  title,
  datetime,
  commentCount,
  onCommentButtonPress,
  ...containerProps
}: PostCardProps) {
  return (
    <XStack
      space="$4"
      theme="Card"
      backgroundColor="$background"
      padding="$4"
      borderRadius="$5"
      borderColor="$borderColor"
      {...containerProps}
    >
      <YStack alignItems="center" space="$2">
        <Button icon={ChevronUp} size="$2" onPress={onVoteUpPress} />
        <Paragraph>{voteCount}</Paragraph>
        <Button icon={ChevronDown} size="$2" onPress={onVoteDownPress} />
      </YStack>
      <YStack space="$3">
        <H3>{title}</H3>
        <Paragraph>Posted {dayjs(datetime).fromNow()}</Paragraph>
        <PostAttribute
          commentCount={commentCount}
          onCommentButtonPress={onCommentButtonPress}
        />
      </YStack>
    </XStack>
  );
}
