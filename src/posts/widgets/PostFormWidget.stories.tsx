import { Meta, StoryFn } from "@storybook/react";
import { PostFormWidget } from "./PostFormWidget";

export default {
  component: PostFormWidget,
} as Meta<typeof PostFormWidget>;

const Template: StoryFn<typeof PostFormWidget> = (args) => (
  <PostFormWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {};
