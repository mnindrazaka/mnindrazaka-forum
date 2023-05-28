import React from "react";
import { Button, H2, ScrollView, XStack, YStack } from "tamagui";
import { PostListWidget } from "../widgets";
import { Container } from "@/uikits/components";
import { PostListWidgetState, getPostListWidgetInitialState } from "../widgets";
import Link from "next/link";
import { useRouter } from "next/router";

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
    pageSize: 20,
    query,
    sortBy: sortBy !== "hot" && sortBy !== "new" ? "new" : sortBy,
  });
  return { postListWidgetInitialState };
}

export function PostListScreen({
  postListWidgetInitialState,
}: PostListScreenProps) {
  const router = useRouter();
  return (
    <Container paddingVertical="$3">
      <YStack space="$3">
        <XStack justifyContent="space-between">
          <H2>Post List</H2>
          <Link href="/posts/new" style={{ textDecoration: "none" }}>
            <Button theme="purple">Create New</Button>
          </Link>
        </XStack>
        <ScrollView>
          <PostListWidget
            initialState={postListWidgetInitialState}
            onPostCardPress={(post) => router.push(`/posts/${post.slug}`)}
          />
        </ScrollView>
      </YStack>
    </Container>
  );
}
