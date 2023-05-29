import { ChevronDown, ChevronUp, MessageSquare } from "@tamagui/lucide-icons";
import React from "react";
import {
  Button,
  Paragraph,
  Spinner,
  XStack,
  YStack,
  YStackProps,
} from "tamagui";
import dayjs from "dayjs";
import { MarkdownView, SkeletonItem } from "@/uikits";

export type CommentCardProps = {
  voteCount: number;
  onVoteUpPress?: () => void;
  onVoteDownPress?: () => void;
  isVoting?: boolean;
  content: string;
  datetime: string;
  onCommentButtonPress?: () => void;
} & YStackProps;

export function CommentCard({
  voteCount,
  onVoteUpPress,
  onVoteDownPress,
  isVoting,
  content,
  datetime,
  onCommentButtonPress,
  ...containerProps
}: CommentCardProps) {
  return (
    <YStack
      space="$3"
      theme="Card"
      backgroundColor="$background"
      padding="$4"
      borderRadius="$5"
      borderColor="$borderColor"
      {...containerProps}
    >
      <SkeletonItem>
        <Paragraph>Posted {dayjs(datetime).fromNow()}</Paragraph>
      </SkeletonItem>

      <SkeletonItem>
        <MarkdownView content={content} />
      </SkeletonItem>

      <XStack gap="$3" flexWrap="wrap">
        <XStack alignItems="center" space="$2">
          <SkeletonItem>
            <Button
              icon={ChevronUp}
              size="$2"
              onPress={onVoteUpPress}
              aria-label="vote up"
            />
          </SkeletonItem>

          <SkeletonItem>
            <Paragraph>{voteCount}</Paragraph>
          </SkeletonItem>

          <SkeletonItem>
            <Button
              icon={ChevronDown}
              size="$2"
              onPress={onVoteDownPress}
              aria-label="vote down"
            />
          </SkeletonItem>

          <YStack width="$1">{isVoting && <Spinner />}</YStack>
        </XStack>

        <SkeletonItem>
          <Button icon={MessageSquare} onPress={onCommentButtonPress} size="$3">
            Reply
          </Button>
        </SkeletonItem>
      </XStack>
    </YStack>
  );
}
