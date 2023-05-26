import { Meta, StoryFn } from "@storybook/react";
import { MarkdownView } from "./MarkdownView";

export default {
  component: MarkdownView,
} as Meta<typeof MarkdownView>;

const Template: StoryFn<typeof MarkdownView> = (args) => (
  <MarkdownView {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content: `Mari kita coba apakah tulisan ini bakal **bold** dan *miring* ?`,
};
