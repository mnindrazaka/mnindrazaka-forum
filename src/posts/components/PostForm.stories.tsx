import { Meta, StoryFn } from "@storybook/react";
import { PostForm } from "./PostForm";

export default {
  component: PostForm,
} as Meta<typeof PostForm>;

const Template: StoryFn<typeof PostForm> = (args) => <PostForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "",
  content: "",
};

export const IsSubmitting = Template.bind({});
IsSubmitting.args = {
  title: "",
  content: "",
  isSubmitting: true,
};

export const ShowTextLength = Template.bind({});
ShowTextLength.args = {
  title: "",
  content: "**lorem ipsum dolor sit amet**",
  isSubmitting: true,
  textContent: {
    value: "lorem ipsum dolor sit amet",
    maxLength: 255,
  },
};
