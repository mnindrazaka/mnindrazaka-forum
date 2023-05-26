import * as fakers from "../fakers";

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

export type CreatePosParams = {
  title: string;
  content: string;
};

export async function createPost({ title, content }: CreatePosParams) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const { success } = await fakers.createPost({
    post: {
      title,
      slug,
      content,
      // TODO: change this based on authenticated user
      user: { name: "anonymous", serial: "1", username: "anonymous" },
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
