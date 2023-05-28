import { Meta, StoryFn } from "@storybook/react";
import { PostDetailWidget, PostDetailWidgetCard } from "./PostDetailWidget";
import { posts } from "@/fakers";

export default {
  component: PostDetailWidget,
} as Meta<typeof PostDetailWidget>;

const Template: StoryFn<typeof PostDetailWidget> = (args) => (
  <PostDetailWidget {...args}>
    <PostDetailWidgetCard />
  </PostDetailWidget>
);

export const Default = Template.bind({});
Default.args = {
  slug: posts[0].slug,
};
