import { Meta, StoryFn } from "@storybook/react";
import { CommentCardWidget } from "./CommentCardWidget";

export default {
  component: CommentCardWidget,
} as Meta<typeof CommentCardWidget>;

const Template: StoryFn<typeof CommentCardWidget> = (args) => (
  <CommentCardWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  datetime: new Date().toISOString(),
  voteCount: 255,
  serial: "1",
  content: "Lorem Ipsum Dolor **Sit Amet**",
};
