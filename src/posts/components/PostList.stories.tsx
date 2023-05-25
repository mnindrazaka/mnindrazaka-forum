import { Meta, StoryFn } from "@storybook/react";
import { PostList } from "./PostList";
import { Skeleton } from "../../uikits/components";

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
};

export const IsLoading = Template.bind({});
IsLoading.args = {
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
};
IsLoading.decorators = [(Story) => <Skeleton isLoading>{Story()}</Skeleton>];

export const HasNextPage = Template.bind({});
HasNextPage.args = {
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
    isLoading: false,
    isShow: true,
  },
};

export const IsLoadingMore = Template.bind({});
IsLoadingMore.args = {
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
  },
};
