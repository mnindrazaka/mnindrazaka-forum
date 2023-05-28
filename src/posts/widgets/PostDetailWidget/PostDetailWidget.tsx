import React from "react";
import {
  AlertDialog,
  Button,
  H3,
  H4,
  Paragraph,
  XStack,
  YStack,
} from "tamagui";
import { Skeleton } from "@/uikits";
import { usePostDetailWidgetReducer } from "./PostDetailWidget.reducer";
import { match } from "ts-pattern";
import * as fakers from "@/fakers";
import { PostCardWidget } from "../PostCardWidget";
import {
  PostDetailWidgetContext,
  PostDetailWidgetProvider,
  usePostDetailWidgetContext,
} from "./PostDetailWidget.context";

export type PostDetailWidgetCardProps = {
  onBackButtonPress?: () => void;
};

export function PostDetailWidgetCard({
  onBackButtonPress,
}: PostDetailWidgetCardProps) {
  const { state, send } = usePostDetailWidgetContext();

  const isLoading = match(state)
    .with({ type: "idle" }, { type: "loading" }, { type: "error" }, () => true)
    .otherwise(() => false);

  const post = match(state)
    .with({ type: "main" }, { type: "voting" }, (state) => state.post)
    .otherwise(() => fakers.posts[0]);

  return (
    <>
      <Skeleton isLoading={isLoading}>
        <PostCardWidget {...post} />
      </Skeleton>
      <AlertDialog open={state.type === "error"}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <YStack space="$3">
              <H3>Something Went Wrong</H3>
              <Paragraph>{state.errorMessage}</Paragraph>
              <XStack space="$3">
                <Button onPress={() => send({ type: "refetch" })}>Retry</Button>
                {onBackButtonPress && (
                  <Button onPress={onBackButtonPress}>Back</Button>
                )}
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </>
  );
}

export type PostDetailWidgetProps = {
  slug: string;
  children:
    | React.ReactNode
    | ((context: PostDetailWidgetContext) => React.ReactNode);
};

export function PostDetailWidget({ slug, children }: PostDetailWidgetProps) {
  const [state, send] = usePostDetailWidgetReducer({ slug });
  const contextValue = { state, send };
  return (
    <PostDetailWidgetProvider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}
    </PostDetailWidgetProvider>
  );
}
