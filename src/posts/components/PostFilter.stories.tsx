import { Meta, StoryFn } from "@storybook/react";
import { PostFilter } from "./PostFilter";

export default {
  component: PostFilter,
} as Meta<typeof PostFilter>;

const Template: StoryFn<typeof PostFilter> = (args) => <PostFilter {...args} />;

export const Default = Template.bind({});
Default.args = {
  searchValue: "",
  selectedSort: "hot",
};
