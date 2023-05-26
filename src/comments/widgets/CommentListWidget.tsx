import React from "react";
import {
  CommentListWidgetState,
  useCommentListWidgetReducer,
} from "./CommentListWidget.reducer";
import { AlertDialog, Button, H3, Paragraph, XStack, YStack } from "tamagui";
import { match } from "ts-pattern";
import { Skeleton } from "../../uikits/components";
import { CommentCardWidget } from "./CommentCardWidget";
import * as fakers from "../../fakers";

export type CommentListWidgetProps = {
  postSlug: string;
  initialState?: CommentListWidgetState | null;
};

export function CommentListWidget({
  initialState,
  postSlug,
}: CommentListWidgetProps) {
  const [state, send] = useCommentListWidgetReducer({ initialState, postSlug });

  const isLoading = match(state)
    .with({ type: "idle" }, { type: "loading" }, () => true)
    .otherwise(() => false);

  const comments = isLoading ? fakers.comments : state.comments;

  return (
    <Skeleton isLoading={isLoading}>
      <YStack space="$3">
        <YStack space="$3">
          {comments.map((comment) => (
            <CommentCardWidget key={comment.serial} {...comment} />
          ))}
        </YStack>

        <AlertDialog open={state.type === "loadingError"}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <YStack space="$3">
                <H3>Something Went Wrong</H3>
                <Paragraph>{state.errorMessage}</Paragraph>
                <XStack space="$3">
                  <Button onPress={() => send({ type: "refetch" })}>
                    Retry
                  </Button>
                </XStack>
              </YStack>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog>
      </YStack>
    </Skeleton>
  );
}
