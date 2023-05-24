import { Post } from "./models";
import * as fakers from "../fakers";

type GetPostListParams = {
  page?: number;
  pageSize?: number;
  query?: string;
  sortBy?: "hot" | "new";
};

export function getPostList({
  page = 1,
  pageSize = 20,
  query = "",
  sortBy = "new",
}: GetPostListParams) {
  return new Promise<{ posts: Post[]; hasNextPage: boolean }>(
    (resolve, _reject) => {
      setTimeout(() => {
        const { data, hasNextPage } = fakers.getPostList({
          page,
          pageSize,
          query,
          sortBy,
        });
        return resolve({ posts: data, hasNextPage });
      }, 3000);
    }
  );
}
