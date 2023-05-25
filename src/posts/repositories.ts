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
