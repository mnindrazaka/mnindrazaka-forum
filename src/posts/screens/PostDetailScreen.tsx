import { ScrollView } from "tamagui";
import { Container } from "../../uikits/components";
import React from "react";
import { PostDetailWidget } from "../widgets";

export type PostDetailScreenProps = {
  slug: string;
};

export function PostDetailScreen({ slug }: PostDetailScreenProps) {
  return (
    <Container paddingVertical="$3">
      <ScrollView>
        <PostDetailWidget slug={slug} />
      </ScrollView>
    </Container>
  );
}
