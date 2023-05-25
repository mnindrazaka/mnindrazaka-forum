import React from "react";
import {
  PostListWidgetState,
  usePostListWidgetReducer,
} from "./PostListWidget.reducer";
import {
  AlertDialog,
  Button,
  H3,
  Paragraph,
  Spinner,
  XStack,
  YStack,
} from "tamagui";
import { match } from "ts-pattern";
import { PostFilter } from "../components";
import { Skeleton } from "../../uikits/components";
import { PostCardWidget } from "./PostCardWidget";
import * as fakers from "../../fakers";

export type PostListWidgetProps = {
  initialState?: PostListWidgetState;
};

export function PostListWidget(props: PostListWidgetProps) {
  const [state, send] = usePostListWidgetReducer(props.initialState);

  const isLoading = match(state)
    .with({ type: "idle" }, { type: "loading" }, () => true)
    .otherwise(() => false);

  const isLoadingMore = match(state)
    .with({ type: "loadingMore" }, () => true)
    .otherwise(() => false);

  const isError = match(state)
    .with({ type: "loadingError" }, { type: "loadingMoreError" }, () => true)
    .otherwise(() => false);

  const showCancelButton = match(state)
    .with({ type: "loadingMoreError" }, () => true)
    .otherwise(() => false);

  const handleRefecth = () => {
    match(state)
      .with({ type: "loadingError" }, () => send({ type: "refetch" }))
      .with({ type: "loadingMoreError" }, () => send({ type: "refetchMore" }))
      .otherwise(() => {});
  };

  const posts = isLoading ? fakers.posts : state.posts;

  return (
    <Skeleton isLoading={isLoading}>
      <YStack space="$3">
        <PostFilter
          searchValue={state.query}
          onChangeSearchValue={(value) =>
            send({ type: "updateQuery", query: value })
          }
          selectedSort={state.sortBy}
          onChangeSort={(sortBy) => send({ type: "updateSortBy", sortBy })}
        />
        <YStack space="$3">
          {posts.map((post) => (
            <PostCardWidget key={post.serial} {...post} />
          ))}
        </YStack>

        {state.hasNextPage && (
          <XStack>
            <Button
              icon={isLoadingMore ? <Spinner /> : null}
              onPress={() => send({ type: "fetchMore" })}
            >
              Load More
            </Button>
          </XStack>
        )}

        <AlertDialog open={isError}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <YStack space="$3">
                <H3>Something Went Wrong</H3>
                <Paragraph>{state.errorMessage}</Paragraph>
                <XStack space="$3">
                  <Button onPress={handleRefecth}>Retry</Button>
                  {showCancelButton && (
                    <Button onPress={() => send({ type: "fetchMoreCancel" })}>
                      Cancel
                    </Button>
                  )}
                </XStack>
              </YStack>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog>
      </YStack>
    </Skeleton>
  );
}
