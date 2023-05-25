import {
  PostListScreen,
  PostListScreenProps,
  getPostListScreenProps,
} from "@/posts/screens";
import { getQuery } from "@/utils";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<
  PostListScreenProps
> = async (ctx) => {
  const query = getQuery(ctx.query.query, "");
  const sortBy = getQuery(ctx.query.sortBy, "new");
  const props = await getPostListScreenProps({
    page: 1,
    query,
    sortBy,
  });
  return { props };
};

export default PostListScreen;
