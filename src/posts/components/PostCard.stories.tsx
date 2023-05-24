import { Meta, StoryFn } from "@storybook/react";
import { PostCard } from "./PostCard";

export default {
  component: PostCard,
} as Meta<typeof PostCard>;

const Template: StoryFn<typeof PostCard> = (args) => <PostCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Hokage Terbaik Sepanjang Sejarah Konoha",
  datetime: new Date().toISOString(),
  voteCount: 285,
  commentCount: 685,
};
