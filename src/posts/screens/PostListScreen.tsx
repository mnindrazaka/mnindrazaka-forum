import React from "react";
import { H2, ScrollView, YStack } from "tamagui";
import { PostListWidget } from "../widgets";
import { Container } from "../../uikits/components";
import {
  PostListWidgetState,
  getPostListWidgetInitialState,
} from "../widgets/PostListWidget.reducer";

export type PostListScreenProps = {
  postListWidgetInitialState?: PostListWidgetState;
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
  return { postListWidgetInitialState };
}

export function PostListScreen({
  postListWidgetInitialState,
}: PostListScreenProps) {
  return (
    <Container>
      <YStack space="$3">
        <H2>Post List</H2>
        <ScrollView>
          <PostListWidget initialState={postListWidgetInitialState} />
        </ScrollView>
      </YStack>
    </Container>
  );
}
