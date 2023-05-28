import React from "react";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import type { ICommand, MDEditorProps } from "@uiw/react-md-editor";

export type MarkdownEditorProps = {
  value: string;
  onChange?: (value: string) => void;
};

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [commands, setCommands] = React.useState<ICommand[]>([]);
  const [Editor, setEditor] = React.useState<
    React.ComponentType<MDEditorProps> | undefined
  >();

  /*
    We need to lazy import the @uiw/react-md-editor module because it is not works in SSR
  */
  React.useEffect(() => {
    import("@uiw/react-md-editor").then(
      ({ bold, strikethrough, italic, link, image, default: MdEditor }) => {
        setCommands([bold, strikethrough, italic, link, image]);
        setEditor(MdEditor);
      }
    );
  }, []);

  return Editor ? (
    <Editor
      value={value}
      onChange={onChange ? (value) => onChange(value ?? "") : undefined}
      commands={commands}
    />
  ) : null;
}
