import React from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Button, Input, Label, Spinner, XStack, YStack } from "tamagui";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

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

      <MDEditor
        value={content}
        onChange={
          onChangeContent ? (value) => onChangeContent(value ?? "") : undefined
        }
      />

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
