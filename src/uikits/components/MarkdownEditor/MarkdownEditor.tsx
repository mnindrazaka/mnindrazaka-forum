import React from "react";
import dynamic from "next/dynamic";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

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
      toolbarHeight={60}
    />
  );
}
