import { Meta, StoryFn } from "@storybook/react";
import { CommentForm } from "./CommentForm";

export default {
  component: CommentForm,
} as Meta<typeof CommentForm>;

const Template: StoryFn<typeof CommentForm> = (args) => (
  <CommentForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content: "",
};

export const IsSubmitting = Template.bind({});
IsSubmitting.args = {
  content: "",
  isSubmitting: true,
};
