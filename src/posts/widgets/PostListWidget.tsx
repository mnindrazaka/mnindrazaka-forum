import React from "react";
import { SortBy, usePostListWidgetReducer } from "./PostListWidget.reducer";
import { AlertDialog, Button, H3, Paragraph, XStack, YStack } from "tamagui";
import { match } from "ts-pattern";
import { PostList } from "../components";
import { Skeleton } from "../../uikits/components";
import { Post } from "../models";
import { PostFilter } from "../components/PostFilter";

const skeletonItems: Post[] = [
  {
    comments: [],
    commentCount: 100,
    voteCount: 255,
    content: "Lorem Ipsum Dolor Sit Amet",
    datetime: new Date().toISOString(),
    serial: "1",
    slug: "hokage-terbaik-sepanjang-sejarah-konoha",
    title: "Hokage Terbaik Sepanjang Sejarah Konoha",
    user: {
      serial: "1",
      name: "M. Nindra Zaka",
      username: "mnindrazaka",
    },
  },
  {
    comments: [],
    commentCount: 100,
    voteCount: 255,
    content: "Lorem Ipsum Dolor Sit Amet",
    datetime: new Date().toISOString(),
    serial: "2",
    slug: "konten-terbaik-sepanjang-sejarah-konoha",
    title: "Konten Terbaik Sepanjang Sejarah Konoha",
    user: {
      serial: "1",
      name: "M. Nindra Zaka",
      username: "mnindrazaka",
    },
  },
  {
    comments: [],
    commentCount: 100,
    voteCount: 255,
    content: "Lorem Ipsum Dolor Sit Amet",
    datetime: new Date().toISOString(),
    serial: "3",
    slug: "tips-dan-trick-untuk-menjadi-viral",
    title: "Tips dan Trick untuk Menjadi Viral",
    user: {
      serial: "1",
      name: "M. Nindra Zaka",
      username: "mnindrazaka",
    },
  },
];

export function PostListWidget(_props: {}) {
  const [state, send] = usePostListWidgetReducer();

  const isLoading = match(state)
    .with({ type: "idle" }, { type: "loading" }, () => true)
    .otherwise(() => false);

  const isLoadingMore = match(state)
    .with({ type: "loadingMore" }, () => true)
    .otherwise(() => false);

  const query = match(state)
    .with({ type: "idle" }, () => "")
    .otherwise(({ query }) => query);

  const sortBy = match<typeof state, SortBy>(state)
    .with({ type: "idle" }, () => "hot")
    .otherwise(({ sortBy }) => sortBy);

  const posts = match(state)
    .with(
      { type: "idle" },
      { type: "loading" },
      { type: "loadingError" },
      () => skeletonItems
    )
    .otherwise(({ posts }) => posts);

  const hasNextPage = match(state)
    .with(
      { type: "idle" },
      { type: "loading" },
      { type: "loadingError" },
      () => false
    )
    .otherwise(({ hasNextPage }) => hasNextPage);

  const isError = match(state)
    .with({ type: "loadingError" }, { type: "loadingMoreError" }, () => true)
    .otherwise(() => false);

  const showCancelButton = match(state)
    .with({ type: "loadingMoreError" }, () => true)
    .otherwise(() => false);

  const errorMessage = match(state)
    .with(
      { type: "loadingError" },
      { type: "loadingMoreError" },
      ({ errorMessage }) => errorMessage
    )
    .otherwise(() => "");

  const handleRefecth = () => {
    match(state)
      .with({ type: "loadingError" }, () => send({ type: "refetch" }))
      .with({ type: "loadingMoreError" }, () => send({ type: "refetchMore" }))
      .otherwise(() => {});
  };

  return (
    <Skeleton isLoading={isLoading}>
      <YStack space="$3">
        <PostFilter
          searchValue={query}
          onChangeSearchValue={(value) =>
            send({ type: "updateQuery", query: value })
          }
          selectedSort={sortBy}
          onChangeSort={(sortBy) => send({ type: "updateSortBy", sortBy })}
        />
        <PostList
          items={posts}
          loadMore={{
            isLoading: isLoadingMore,
            isShow: hasNextPage,
            onPress: () => send({ type: "fetchMore" }),
          }}
        />
        <AlertDialog open={isError}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <YStack space="$3">
                <H3>Something Went Wrong</H3>
                <Paragraph>{errorMessage}</Paragraph>
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
