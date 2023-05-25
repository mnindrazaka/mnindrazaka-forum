import React from "react";
import { H2, ScrollView, YStack } from "tamagui";
import { PostListWidget } from "../widgets";

export type PostListScreenProps = {};

export function PostListScreen(_props: PostListScreenProps) {
  return (
    <YStack space="$3">
      <H2>Post List</H2>
      <ScrollView>
        <PostListWidget />
      </ScrollView>
    </YStack>
  );
}
