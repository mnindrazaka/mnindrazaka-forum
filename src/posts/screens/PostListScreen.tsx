import React from "react";
import { Button, H2, ScrollView, XStack, YStack } from "tamagui";
import { PostListWidget } from "../widgets";
import { Container } from "../../uikits/components";
import {
  PostListWidgetState,
  getPostListWidgetInitialState,
} from "../widgets/PostListWidget.reducer";
import Link from "next/link";

export type PostListScreenProps = {
  postListWidgetInitialState: PostListWidgetState | null;
};

type GetPostListScreenPropsParams = {
  page: number;
  query: string;
  sortBy: string;
};

export async function getPostListScreenProps({
  page,
  query,
  sortBy,
}: GetPostListScreenPropsParams): Promise<PostListScreenProps> {
  const postListWidgetInitialState = await getPostListWidgetInitialState({
    page,
    pageSize: 1,
    query,
    sortBy: sortBy !== "hot" && sortBy !== "new" ? "new" : sortBy,
  });
  return { postListWidgetInitialState: postListWidgetInitialState ?? null };
}

export function PostListScreen({
  postListWidgetInitialState,
}: PostListScreenProps) {
  return (
    <Container paddingVertical="$3">
      <YStack space="$3">
        <XStack justifyContent="space-between">
          <H2>Post List</H2>
          <Link href="/posts/new" style={{ textDecoration: "none" }}>
            <Button>Create New</Button>
          </Link>
        </XStack>
        <ScrollView>
          <PostListWidget
            initialState={postListWidgetInitialState ?? undefined}
          />
        </ScrollView>
      </YStack>
    </Container>
  );
}
