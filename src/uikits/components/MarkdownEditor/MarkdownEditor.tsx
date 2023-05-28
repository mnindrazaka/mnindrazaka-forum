import React from "react";
import dynamic from "next/dynamic";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import {
  bold,
  image,
  italic,
  link,
  strikethrough,
  title,
  title1,
  title2,
  title3,
  title4,
  title5,
  title6,
} from "@uiw/react-md-editor";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export type MarkdownEditorProps = {
  value: string;
  onChange?: (value: string) => void;
};

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <MDEditor
      value={value}
      onChange={onChange ? (value) => onChange(value ?? "") : undefined}
      commands={[bold, strikethrough, italic, link, image]}
    />
  );
}
