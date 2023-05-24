import { Meta, StoryFn } from "@storybook/react";
import { PostAttribute } from "./PostAttribute";

export default {
  component: PostAttribute,
} as Meta<typeof PostAttribute>;

const Template: StoryFn<typeof PostAttribute> = (args) => (
  <PostAttribute {...args} />
);

export const Default = Template.bind({});
Default.args = {
  commentCount: 685,
};
