import { Meta, StoryFn } from "@storybook/react";
import { PostCard } from "./PostCard";
import { Skeleton } from "../../uikits/components";

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

export const WithContent = Template.bind({});
WithContent.args = {
  title: "Hokage Terbaik Sepanjang Sejarah Konoha",
  datetime: new Date().toISOString(),
  voteCount: 285,
  commentCount: 685,
  content: `Hi Gaes, ini gimana ya kalau aku buat jadi tebal pake **begini** ?`,
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  title: "Hokage Terbaik Sepanjang Sejarah Konoha",
  datetime: new Date().toISOString(),
  voteCount: 285,
  commentCount: 685,
  content: `Hi Gaes, ini gimana ya kalau aku buat jadi tebal pake **begini** ?`,
};
IsLoading.decorators = [(Story) => <Skeleton isLoading>{Story()}</Skeleton>];
