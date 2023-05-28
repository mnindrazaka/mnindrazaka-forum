import { Meta, StoryFn } from "@storybook/react";
import { PostCardWidget } from "./PostCardWidget";
import { posts } from "@/fakers";

export default {
  component: PostCardWidget,
} as Meta<typeof PostCardWidget>;

const Template: StoryFn<typeof PostCardWidget> = (args) => (
  <PostCardWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  commentCount: 100,
  datetime: new Date().toISOString(),
  slug: posts[0].slug,
  title: posts[0].title,
  voteCount: 255,
};
