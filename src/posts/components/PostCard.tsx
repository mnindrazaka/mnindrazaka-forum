import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import React from "react";
import {
  Button,
  H3,
  Paragraph,
  Spinner,
  XStack,
  XStackProps,
  YStack,
} from "tamagui";
import { PostAttribute } from "./PostAttribute";
import dayjs from "dayjs";
import { MarkdownView, SkeletonItem } from "@/uikits";

export type PostCardProps = {
  voteCount: number;
  onVoteUpPress?: () => void;
  onVoteDownPress?: () => void;
  isVoting?: boolean;
  title: string;
  content?: string;
  datetime: string;
  commentCount: number;
  onCommentButtonPress?: () => void;
} & XStackProps;

export function PostCard({
  voteCount,
  onVoteUpPress,
  onVoteDownPress,
  isVoting,
  title,
  content,
  datetime,
  commentCount,
  onCommentButtonPress,
  ...containerProps
}: PostCardProps) {
  console.log("isVoting", isVoting);
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
        <SkeletonItem>
          <Button
            icon={ChevronUp}
            size="$2"
            onPress={onVoteUpPress}
            aria-label="vote-up"
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
            aria-label="vote-down"
          />
        </SkeletonItem>

        {isVoting && <Spinner />}
      </YStack>
      <YStack space="$3" flexShrink={1}>
        <SkeletonItem>
          <H3>{title}</H3>
        </SkeletonItem>

        <SkeletonItem>
          <Paragraph>Posted {dayjs(datetime).fromNow()}</Paragraph>
        </SkeletonItem>

        {content && (
          <SkeletonItem>
            <MarkdownView content={content} />
          </SkeletonItem>
        )}

        <PostAttribute
          commentCount={commentCount}
          onCommentButtonPress={onCommentButtonPress}
        />
      </YStack>
    </XStack>
  );
}
