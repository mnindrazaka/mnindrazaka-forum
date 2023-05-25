import { Meta, StoryFn } from "@storybook/react";
import { PostAttribute } from "./PostAttribute";
import { Skeleton } from "../../uikits/components";

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

export const IsLoading = Template.bind({});
IsLoading.args = {
  commentCount: 685,
};
IsLoading.decorators = [(Story) => <Skeleton isLoading>{Story()}</Skeleton>];
