import * as fakers from "../fakers";

export type GetPostListParams = {
  page?: number;
  pageSize?: number;
  query?: string;
  sortBy?: "hot" | "new";
};

export async function getPostList({
  page = 1,
  pageSize = 20,
  query = "",
  sortBy = "new",
}: GetPostListParams) {
  const { data, hasNextPage } = await fakers.getPostList({
    page,
    pageSize,
    query,
    sortBy,
  });
  return { posts: data, hasNextPage };
}

type VotePostParams = {
  slug: string;
  amount: number;
};

export function votePost({ slug, amount }: VotePostParams) {
  return fakers.votePost({ slug, amount });
}

export function updateQueryURL(params: {
  query: string;
  sortBy: "hot" | "new";
}) {
  const url = new URL(window.location.href);
  url.searchParams.set("query", params.query);
  url.searchParams.set("sortBy", params.sortBy);
  window.history.pushState(null, "", url.toString());
}
