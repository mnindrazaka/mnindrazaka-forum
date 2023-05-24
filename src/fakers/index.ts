import { Post } from "@/posts/models";
import { nanoid } from "nanoid";

const posts: Post[] = [
  {
    comments: [],
    commentCount: 100,
    voteCount: 255,
    content: "Lorem Ipsum Dolor Sit Amet",
    datetime: new Date().toISOString(),
    serial: "1",
    slug: "hokage-terbaik-sepanjang-sejarah-konoha",
    title: "Hokage Terbaik Sepanjang Sejarah Konoha",
    user: {
      serial: "1",
      name: "M. Nindra Zaka",
      username: "mnindrazaka",
    },
  },
  {
    comments: [],
    commentCount: 100,
    voteCount: 255,
    content: "Lorem Ipsum Dolor Sit Amet",
    datetime: new Date().toISOString(),
    serial: "2",
    slug: "konten-terbaik-sepanjang-sejarah-konoha",
    title: "Konten Terbaik Sepanjang Sejarah Konoha",
    user: {
      serial: "1",
      name: "M. Nindra Zaka",
      username: "mnindrazaka",
    },
  },
  {
    comments: [],
    commentCount: 100,
    voteCount: 255,
    content: "Lorem Ipsum Dolor Sit Amet",
    datetime: new Date().toISOString(),
    serial: "3",
    slug: "tips-dan-trick-untuk-menjadi-viral",
    title: "Tips dan Trick untuk Menjadi Viral",
    user: {
      serial: "1",
      name: "M. Nindra Zaka",
      username: "mnindrazaka",
    },
  },
];

type GetPostListParams = {
  page: number;
  pageSize: number;
  query: string;
  sortBy: "hot" | "new";
};

export function getPostList({
  page,
  pageSize,
  query,
  sortBy,
}: GetPostListParams) {
  const filteredPosts = posts.filter((post) => post.title.includes(query));
  const totalItem = filteredPosts.length;
  const totalPage = Math.ceil(totalItem / pageSize);

  const start = pageSize * (page - 1);
  const end = start + pageSize;
  const paginatedPosts = filteredPosts.slice(start, end);

  return {
    data: paginatedPosts,
    total: totalItem,
    hasNextPage: page < totalPage,
  };
}

type GetPostDetailParams = {
  slug: string;
};

export function getPostDetail({ slug }: GetPostDetailParams) {
  return {
    data: posts.find((post) => post.slug === slug) ?? null,
  };
}

type CreatePostParams = {
  post: Omit<
    Post,
    "serial" | "datetime" | "voteCount" | "commentCount" | "comments"
  >;
};

export function createPost({ post }: CreatePostParams) {
  const newPost: Post = {
    ...post,
    commentCount: 0,
    voteCount: 0,
    comments: [],
    datetime: new Date().toISOString(),
    serial: nanoid(),
  };

  posts.push(newPost);

  return {
    success: true,
  };
}
