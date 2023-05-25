import {
  PostListScreen,
  PostListScreenProps,
  getPostListScreenProps,
} from "@/posts/screens";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<
  PostListScreenProps
> = async (ctx) => {
  const query = Array.isArray(ctx.query.query)
    ? ctx.query.query[0]
    : ctx.query.query ?? "";
  const sortBy = Array.isArray(ctx.query.sortBy)
    ? ctx.query.sortBy[0]
    : ctx.query.sortBy ?? "new";

  const props = await getPostListScreenProps({
    page: 1,
    query,
    sortBy: sortBy !== "hot" && sortBy !== "new" ? "new" : sortBy,
  });
  return { props };
};

export default PostListScreen;
