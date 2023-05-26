import { Meta, StoryFn } from "@storybook/react";
import { PostDetailScreen } from "./PostDetailScreen";

export default {
  component: PostDetailScreen,
} as Meta<typeof PostDetailScreen>;

const Template: StoryFn<typeof PostDetailScreen> = (args) => (
  <PostDetailScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  slug: "hokage-terbaik-sepanjang-sejarah-konoha",
};
