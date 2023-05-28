import { Meta, StoryFn } from "@storybook/react";
import { CommentFormWidget } from "./CommentFormWidget";

export default {
  component: CommentFormWidget,
} as Meta<typeof CommentFormWidget>;

const Template: StoryFn<typeof CommentFormWidget> = (args) => (
  <CommentFormWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {};
