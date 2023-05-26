import { Meta, StoryFn } from "@storybook/react";
import { CommentListWidget } from "./CommentListWidget";

export default {
  component: CommentListWidget,
} as Meta<typeof CommentListWidget>;

const Template: StoryFn<typeof CommentListWidget> = (args) => (
  <CommentListWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  postSlug: "hokage-terbaik-sepanjang-sejarah-konoha",
};
