import { Meta, StoryFn } from "@storybook/react";
import { PostListScreen } from "./PostListScreen";

export default {
  component: PostListScreen,
} as Meta<typeof PostListScreen>;

const Template: StoryFn<typeof PostListScreen> = (args) => (
  <PostListScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {};
