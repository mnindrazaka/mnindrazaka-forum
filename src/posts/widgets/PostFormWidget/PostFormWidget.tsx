import React from "react";
import { PostForm } from "../../components";
import { usePostFormWidgetReducer } from "./PostFormWidget.reducer";
import { AlertDialog, Button, H3, Paragraph, XStack, YStack } from "tamagui";

export type PostFormWidgetProps = {
  onSubmitSuccess?: () => void;
  maxTextContentLength?: number;
};

export function PostFormWidget({
  onSubmitSuccess,
  maxTextContentLength = 255,
}: PostFormWidgetProps) {
  const [state, send] = usePostFormWidgetReducer({
    onSubmitSuccess,
    maxTextContentLength,
  });
  return (
    <>
      <PostForm
        title={state.title}
        content={state.content}
        onChangeTitle={(title) => send({ type: "updateTitle", title })}
        onChangeContent={(content) => send({ type: "updateContent", content })}
        isSubmitting={state.type === "submitting"}
        onSubmit={() => send({ type: "submit" })}
        textContent={{
          value: state.textContent,
          maxLength: maxTextContentLength,
        }}
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
