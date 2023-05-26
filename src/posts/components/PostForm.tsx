import React from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Button, Input, Label, Spinner, XStack, YStack } from "tamagui";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type PostFormValues = {
  title: string;
  content: string;
};

export type PostFormProps = {
  values: PostFormValues;
  onChange?: (values: PostFormValues) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
};

export function PostForm({
  values,
  onChange,
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
          value={values.title}
          onChangeText={
            onChange
              ? (value) => onChange({ ...values, title: value })
              : undefined
          }
        />
      </YStack>

      <MDEditor
        value={values.content}
        onChange={
          onChange
            ? (value) => onChange({ ...values, content: value ?? "" })
            : undefined
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
