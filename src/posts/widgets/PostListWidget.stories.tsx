import { Meta, StoryFn } from "@storybook/react";
import { PostListWidget } from "./PostListWidget";

export default {
  component: PostListWidget,
} as Meta<typeof PostListWidget>;

const Template: StoryFn<typeof PostListWidget> = (args) => (
  <PostListWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {};
