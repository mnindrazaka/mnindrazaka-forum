import { Meta, StoryFn } from "@storybook/react";
import { PostDetailWidget } from "./PostDetailWidget";

export default {
  component: PostDetailWidget,
} as Meta<typeof PostDetailWidget>;

const Template: StoryFn<typeof PostDetailWidget> = (args) => (
  <PostDetailWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  slug: "tips-dan-trick-untuk-menjadi-viral",
};
