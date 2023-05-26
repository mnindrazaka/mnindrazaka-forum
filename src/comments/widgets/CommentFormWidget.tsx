import React from "react";
import { CommentForm } from "../components";
import { useCommentFormWidgetReducer } from "./CommentFormWidget.reducer";
import { AlertDialog, Button, H3, Paragraph, XStack, YStack } from "tamagui";

export type CommentFormWidgetProps = {
  onSubmitSuccess?: () => void;
  postSlug: string;
};

export function CommentFormWidget({
  onSubmitSuccess,
  postSlug,
}: CommentFormWidgetProps) {
  const [state, send] = useCommentFormWidgetReducer({
    onSubmitSuccess,
    postSlug,
  });
  return (
    <>
      <CommentForm
        content={state.content}
        onChangeContent={(content) => send({ type: "updateContent", content })}
        isSubmitting={state.type === "submitting"}
        onSubmit={() => send({ type: "submit" })}
      />
      <AlertDialog open={state.type === "submittingError"}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <YStack space="$3">
              <H3>Something Went Wrong</H3>
              <Paragraph>{state.errorMessage}</Paragraph>
              <XStack space="$3">
                <Button onPress={() => send({ type: "resubmit" })}>
                  Retry
                </Button>
                <Button onPress={() => send({ type: "cancelSubmit" })}>
                  Cancel
                </Button>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </>
  );
}
