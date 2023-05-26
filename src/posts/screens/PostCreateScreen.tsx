import React from "react";
import { Container } from "../../uikits/components";
import { H2, ScrollView } from "tamagui";
import { PostFormWidget } from "../widgets";
import { useRouter } from "next/router";

export function PostCreateScreen(_props: {}) {
  const router = useRouter();
  return (
    <ScrollView>
      <Container paddingVertical="$3">
        <H2>Create Post</H2>
        <PostFormWidget onSubmitSuccess={() => router.push("/")} />
      </Container>
    </ScrollView>
  );
}
