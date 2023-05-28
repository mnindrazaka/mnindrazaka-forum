import { Meta, StoryFn } from "@storybook/react";
import { PostDetailScreen } from "./PostDetailScreen";
import { posts } from "@/fakers";

export default {
  component: PostDetailScreen,
} as Meta<typeof PostDetailScreen>;

const Template: StoryFn<typeof PostDetailScreen> = (args) => (
  <PostDetailScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  slug: posts[0].slug,
};
