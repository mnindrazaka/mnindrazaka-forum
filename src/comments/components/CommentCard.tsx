import { ChevronDown, ChevronUp, MessageSquare } from "@tamagui/lucide-icons";
import React from "react";
import { Button, Paragraph, XStack, XStackProps, YStack } from "tamagui";
import dayjs from "dayjs";
import { MarkdownView, SkeletonItem } from "@/uikits";

export type CommentCardProps = {
  voteCount: number;
  onVoteUpPress?: () => void;
  onVoteDownPress?: () => void;
  content: string;
  datetime: string;
  onCommentButtonPress?: () => void;
} & XStackProps;

export function CommentCard({
  voteCount,
  onVoteUpPress,
  onVoteDownPress,
  content,
  datetime,
  onCommentButtonPress,
  ...containerProps
}: CommentCardProps) {
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
      <YStack space="$3">
        <SkeletonItem>
          <Paragraph>Posted {dayjs(datetime).fromNow()}</Paragraph>
        </SkeletonItem>

        <SkeletonItem>
          <MarkdownView content={content} />
        </SkeletonItem>

        <XStack space="$3" {...containerProps}>
          <XStack alignItems="center" space="$2">
            <SkeletonItem>
              <Button icon={ChevronUp} size="$2" onPress={onVoteUpPress} />
            </SkeletonItem>

            <SkeletonItem>
              <Paragraph>{voteCount}</Paragraph>
            </SkeletonItem>

            <SkeletonItem>
              <Button icon={ChevronDown} size="$2" onPress={onVoteDownPress} />
            </SkeletonItem>
          </XStack>

          <SkeletonItem>
            <Button
              icon={MessageSquare}
              onPress={onCommentButtonPress}
              size="$3"
            >
              Reply
            </Button>
          </SkeletonItem>
        </XStack>
      </YStack>
    </XStack>
  );
}
