import React from "react";
import { Container } from "@/uikits";
import { Button, H2, ScrollView, XStack } from "tamagui";
import { PostFormWidget } from "../widgets";
import { useRouter } from "next/router";
import { ArrowLeft } from "@tamagui/lucide-icons";

export function PostCreateScreen(_props: {}) {
  const router = useRouter();
  return (
    <ScrollView>
      <Container paddingVertical="$3">
        <XStack space="$5" alignItems="center">
          <Button icon={ArrowLeft} onPress={() => router.push("/")} size="$3" />
          <H2>Create Post</H2>
        </XStack>
        <PostFormWidget onSubmitSuccess={() => router.push("/")} />
      </Container>
    </ScrollView>
  );
}
