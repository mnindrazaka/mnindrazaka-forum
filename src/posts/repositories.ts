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
