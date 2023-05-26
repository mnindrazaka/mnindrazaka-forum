import { H4, ScrollView } from "tamagui";
import { Container } from "../../uikits/components";
import React from "react";
import { PostDetailWidget } from "../widgets";
import { CommentListWidget } from "../../comments/widgets";

export type PostDetailScreenProps = {
  slug: string;
};

export function PostDetailScreen({ slug }: PostDetailScreenProps) {
  return (
    <Container paddingVertical="$3">
      <ScrollView space="$5">
        <PostDetailWidget slug={slug} />
        <H4>Comments</H4>
        <CommentListWidget postSlug={slug} />
      </ScrollView>
    </Container>
  );
}
