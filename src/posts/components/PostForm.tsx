import React from "react";
import { Button, Input, Label, Spinner, XStack, YStack } from "tamagui";
import { MarkdownEditor } from "@/uikits";

export type PostFormProps = {
  title: string;
  content: string;
  onChangeTitle?: (value: string) => void;
  onChangeContent?: (value: string) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
};

export function PostForm({
  title,
  content,
  onChangeTitle,
  onChangeContent,
  onSubmit,
  isSubmitting,
}: PostFormProps) {
  return (
    <YStack space="$3">
      <YStack>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter post title"
          value={title}
          onChangeText={onChangeTitle}
        />
      </YStack>

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

export default PostForm;
