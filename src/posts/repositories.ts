import * as fakers from "@/fakers";
import { getSlug } from "@/utils";

type SortBy = "hot" | "new";

export type GetPostListParams = {
  page: number;
  pageSize: number;
  query: string;
  sortBy: SortBy;
};

export async function getPostList({
  page,
  pageSize,
  query,
  sortBy,
}: GetPostListParams) {
  const { data, hasNextPage } = await fakers.getPostList({
    page,
    pageSize,
    query,
    sortBy,
  });
  return { posts: data, hasNextPage };
}

export type CreatePostParams = {
  title: string;
  content: string;
};

export async function createPost({ title, content }: CreatePostParams) {
  const slug = getSlug(title);
  const { success } = await fakers.createPost({
    post: {
      title,
      slug,
      content,
    },
  });

  return { success };
}

type VotePostParams = {
  slug: string;
  amount: number;
};

export function votePost({ slug, amount }: VotePostParams) {
  return fakers.votePost({ slug, amount });
}

type UpdateQueryURLParams = {
  query: string;
  sortBy: SortBy;
};

export function updateQueryURL(params: UpdateQueryURLParams) {
  const url = new URL(window.location.href);
  url.searchParams.set("query", params.query);
  url.searchParams.set("sortBy", params.sortBy);
  window.history.pushState(null, "", url.toString());
}

export type GetPostDetailParams = {
  slug: string;
};

export async function getPostDetail({ slug }: GetPostDetailParams) {
  const { data } = await fakers.getPostDetail({ slug });
  return { post: data };
}
