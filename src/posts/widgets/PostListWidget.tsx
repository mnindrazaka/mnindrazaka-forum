import React from "react";
import { usePostListWidgetReducer } from "./PostListWidget.reducer";
import { AlertDialog, Button, H3, Paragraph, XStack, YStack } from "tamagui";
import { match } from "ts-pattern";
import { PostList } from "../components";

export function PostListWidget(_props: {}) {
  const [state, send] = usePostListWidgetReducer();
  return match(state)
    .with({ type: "idle" }, () => <PostList items={[]} />)
    .with({ type: "loading" }, () => <PostList items={[]} />)
    .with({ type: "loadingError" }, ({ errorMessage }) => (
      <>
        <AlertDialog open>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <YStack space="$3">
                <H3>Something Went Wrong</H3>
                <Paragraph>{errorMessage}</Paragraph>
                <Button onPress={() => send({ type: "refetch" })}>Retry</Button>
              </YStack>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog>
        <PostList
          items={[]}
          loadMore={{
            isLoading: false,
            isShow: false,
            onPress: () => send({ type: "fetchMore" }),
          }}
        />
      </>
    ))
    .with({ type: "main" }, ({ posts, hasNextPage }) => (
      <PostList
        items={posts}
        loadMore={{
          isLoading: false,
          isShow: hasNextPage,
          onPress: () => send({ type: "fetchMore" }),
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
        }}
      />
    ))
    .with(
      { type: "loadingMoreError" },
      ({ posts, hasNextPage, errorMessage }) => (
        <>
          <AlertDialog open>
            <AlertDialog.Portal>
              <AlertDialog.Overlay />
              <AlertDialog.Content>
                <YStack space="$3">
                  <H3>Something Went Wrong</H3>
                  <Paragraph>{errorMessage}</Paragraph>
                  <XStack space="$3">
                    <Button onPress={() => send({ type: "refetchMore" })}>
                      Retry
                    </Button>
                    <Button onPress={() => send({ type: "fetchMoreCancel" })}>
                      Cancel
                    </Button>
                  </XStack>
                </YStack>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog>
          <PostList
            items={posts}
            loadMore={{
              isLoading: false,
              isShow: hasNextPage,
              onPress: () => send({ type: "fetchMore" }),
            }}
          />
        </>
      )
    )
    .exhaustive();
}
