import { Meta, StoryFn } from "@storybook/react";
import { PostCreateScreen } from "./PostCreateScreen";

export default {
  component: PostCreateScreen,
} as Meta<typeof PostCreateScreen>;

const Template: StoryFn<typeof PostCreateScreen> = (args) => (
  <PostCreateScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {};
