import React from "react";
import { Button, Spinner, XStack, XStackProps, YStack } from "tamagui";
import { PostCard } from "./PostCard";

export type PostListItem = {
  voteCount: number;
  title: string;
  datetime: string;
  commentCount: number;
};

export type PostListProps = {
  items: PostListItem[];
  onVoteUpPress?: () => void;
  onVoteDownPress?: () => void;
  onCommentButtonPress?: () => void;
  loadMore?: {
    isShow: boolean;
    isLoading: boolean;
    onPress: () => void;
  };
} & XStackProps;

export function PostList({
  items,
  onVoteUpPress,
  onVoteDownPress,
  onCommentButtonPress,
  loadMore,
  ...containerProps
}: PostListProps) {
  return (
    <YStack space="$3" {...containerProps}>
      {items.map((item, index) => (
        <PostCard
          key={index}
          {...item}
          onVoteUpPress={onVoteUpPress}
          onVoteDownPress={onVoteDownPress}
          onCommentButtonPress={onCommentButtonPress}
        />
      ))}

      {loadMore?.isShow && (
        <XStack>
          <Button
            icon={loadMore.isLoading ? <Spinner /> : null}
            onPress={loadMore.onPress}
          >
            Load More
          </Button>
        </XStack>
      )}
    </YStack>
  );
}
