import { Meta, StoryFn } from "@storybook/react";
import { PostForm } from "./PostForm";

export default {
  component: PostForm,
} as Meta<typeof PostForm>;

const Template: StoryFn<typeof PostForm> = (args) => <PostForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  values: {
    title: "",
    content: "",
  },
};

export const IsSubmitting = Template.bind({});
IsSubmitting.args = {
  values: {
    title: "",
    content: "",
  },
  isSubmitting: true,
};
