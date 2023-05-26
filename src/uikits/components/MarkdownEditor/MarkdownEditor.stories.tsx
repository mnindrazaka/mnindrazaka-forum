import { Meta, StoryFn } from "@storybook/react";
import { MarkdownEditor } from "./MarkdownEditor";

export default {
  component: MarkdownEditor,
} as Meta<typeof MarkdownEditor>;

const Template: StoryFn<typeof MarkdownEditor> = (args) => (
  <MarkdownEditor {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: `Mari kita coba apakah tulisan ini bakal **bold** dan *miring* ?`,
};
