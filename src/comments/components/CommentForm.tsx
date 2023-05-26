import React from "react";
import { Button, Spinner, XStack, YStack } from "tamagui";
import { MarkdownEditor } from "../../uikits/components";

export type CommentFormProps = {
  content: string;
  onChangeContent?: (value: string) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
};

export function CommentForm({
  content,
  onChangeContent,
  onSubmit,
  isSubmitting,
}: CommentFormProps) {
  return (
    <YStack space="$3">
      <MarkdownEditor value={content} onChange={onChangeContent} />
      <XStack>
        <Button
          onPress={onSubmit}
          icon={isSubmitting ? <Spinner /> : undefined}
        >
          Submit
        </Button>
      </XStack>
    </YStack>
  );
}

export default CommentForm;
