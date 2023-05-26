import React from "react";
import { Container } from "../../uikits/components";
import { H2, ScrollView } from "tamagui";
import { PostFormWidget } from "../widgets";

export function PostCreateScreen(_props: {}) {
  return (
    <ScrollView>
      <Container paddingVertical="$3">
        <H2>Create Post</H2>
        <PostFormWidget />
      </Container>
    </ScrollView>
  );
}
