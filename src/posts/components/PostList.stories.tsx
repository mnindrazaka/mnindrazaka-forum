import { Meta, StoryFn } from "@storybook/react";
import { PostList } from "./PostList";

export default {
  component: PostList,
} as Meta<typeof PostList>;

const Template: StoryFn<typeof PostList> = (args) => <PostList {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      title: "Hokage Terbaik Sepanjang Sejarah Konoha",
      datetime: new Date().toISOString(),
      voteCount: 285,
      commentCount: 685,
    },
    {
      title: "Berita Terpopuler Sepanjang Masa",
      datetime: new Date().toISOString(),
      voteCount: 285,
      commentCount: 685,
    },
    {
      title: "Tips dan Trick untuk Menjadi Viral",
      datetime: new Date().toISOString(),
      voteCount: 1000,
      commentCount: 500,
    },
  ],
  loadMore: {
    isLoading: true,
    isShow: true,
    onPress: () => {},
    title: "Load More",
  },
};
