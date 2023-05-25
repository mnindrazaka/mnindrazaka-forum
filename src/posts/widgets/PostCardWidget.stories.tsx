import { Meta, StoryFn } from "@storybook/react";
import { PostCardWidget } from "./PostCardWidget";

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
  slug: "tips-dan-trick-untuk-menjadi-viral",
  title: "Tips dan Trick untuk Menjadi Viral",
  voteCount: 255,
};
