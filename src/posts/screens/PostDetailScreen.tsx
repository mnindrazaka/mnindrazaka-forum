import { Button, H3, H4, ScrollView, XStack } from "tamagui";
import { Container } from "@/uikits";
import React from "react";
import { PostDetailWidget, PostDetailWidgetContent } from "../widgets";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { useRouter } from "next/router";
import { CommentListWidget } from "@/comments";

export type PostDetailScreenProps = {
  slug: string;
};

export function PostDetailScreen({ slug }: PostDetailScreenProps) {
  const router = useRouter();
  return (
    <Container paddingVertical="$3">
      <ScrollView space="$5">
        <XStack space="$5" alignItems="center">
          <Button icon={ArrowLeft} onPress={() => router.push("/")} size="$3" />
          <H3>Post Detail</H3>
        </XStack>
        <PostDetailWidget slug={slug}>
          {({ send }) => (
            <>
              <PostDetailWidgetContent
                onBackButtonPress={() => router.push("/")}
              />
              <H4>Comments</H4>
              <CommentListWidget
                postSlug={slug}
                onSubmitSuccess={() => send({ type: "refetch" })}
              />
            </>
          )}
        </PostDetailWidget>
      </ScrollView>
    </Container>
  );
}
