import React from "react";
import { usePostListWidgetReducer } from "./PostListWidget.reducer";
import { match } from "ts-pattern";
import { PostList } from "../components";
import { Paragraph } from "tamagui";

export function PostListWidget(_props: {}) {
  const [state, send] = usePostListWidgetReducer();
  return match(state)
    .with({ type: "idle" }, () => <PostList items={[]} />)
    .with({ type: "loading" }, () => <PostList items={[]} />)
    .with({ type: "loadingError" }, ({ errorMessage }) => (
      <Paragraph>{errorMessage}</Paragraph>
    ))
    .with({ type: "main" }, ({ posts, hasNextPage }) => (
      <PostList
        items={posts}
        loadMore={{
          isLoading: false,
          isShow: hasNextPage,
          onPress: () => send({ type: "fetchMore" }),
          title: "Load More",
        }}
      />
    ))
    .with({ type: "loadingMore" }, ({ posts, hasNextPage }) => (
      <PostList
        items={posts}
        loadMore={{
          isLoading: true,
          isShow: hasNextPage,
          onPress: () => send({ type: "fetchMore" }),
          title: "Load More",
        }}
      />
    ))
    .with({ type: "loadingMoreError" }, ({ errorMessage }) => (
      <Paragraph>{errorMessage}</Paragraph>
    ))
    .exhaustive();
}
