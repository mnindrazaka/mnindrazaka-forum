import { Post } from "@/posts/models";
import { nanoid } from "nanoid";
import { simulateFetch } from "./utils";

export const posts: Post[] = [];

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
  return simulateFetch(() => {
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    const sortedPosts = filteredPosts.sort((prev, next) =>
      sortBy === "new"
        ? new Date(next.datetime).getTime() - new Date(prev.datetime).getTime()
        : next.voteCount - prev.voteCount
    );
    const totalItem = sortedPosts.length;
    const totalPage = Math.ceil(totalItem / pageSize);

    const start = pageSize * (page - 1);
    const end = start + pageSize;
    const paginatedPosts = sortedPosts.slice(start, end);

    return {
      data: paginatedPosts,
      total: totalItem,
      hasNextPage: page < totalPage,
    };
  });
}

type GetPostDetailParams = {
  slug: string;
};

export function getPostDetail({ slug }: GetPostDetailParams) {
  return simulateFetch(() => {
    const data = posts.find((post) => post.slug === slug);

    if (!data) throw new Error("Post is not found");

    return { data };
  });
}

type CreatePostParams = {
  post: Omit<
    Post,
    "serial" | "datetime" | "voteCount" | "commentCount" | "comments"
  >;
};

export function createPost({ post }: CreatePostParams) {
  return simulateFetch(() => {
    const newPost: Post = {
      ...post,
      commentCount: 0,
      voteCount: 0,
      datetime: new Date().toISOString(),
      serial: nanoid(),
    };

    posts.push(newPost);

    return {
      success: true,
    };
  });
}

type VotePostParams = {
  slug: string;
  amount: number;
};

export function votePost({ amount, slug }: VotePostParams) {
  return simulateFetch(() => {
    const index = posts.findIndex((post) => post.slug === slug);
    if (index === -1) throw new Error("Post slug is not found");

    posts[index] = {
      ...posts[index],
      voteCount: posts[index].voteCount + amount,
    };

    return {
      success: true,
    };
  });
}
