import { Meta, StoryFn } from "@storybook/react";
import { CommentCard } from "./CommentCard";
import { Skeleton } from "../../uikits/components";

export default {
  component: CommentCard,
} as Meta<typeof CommentCard>;

const Template: StoryFn<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  datetime: new Date().toISOString(),
  voteCount: 285,
  content: `Hi Gaes, ini gimana ya kalau aku buat jadi tebal pake **begini** ?`,
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  datetime: new Date().toISOString(),
  voteCount: 285,
  content: `Hi Gaes, ini gimana ya kalau aku buat jadi tebal pake **begini** ?`,
};
IsLoading.decorators = [(Story) => <Skeleton isLoading>{Story()}</Skeleton>];
