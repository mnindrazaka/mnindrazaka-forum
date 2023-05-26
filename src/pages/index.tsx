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

  /*
  This code is for example purpose only.
  Currently we pass null to postListWidgetInitialState to prevent the browser get initial data from server,
  we need to do this because we are not sync the browser state to server (via endpoint), so the server data is obsolete
  
  TODO: implement API endpoint and pass the props.postListWidgetInitialState
  */
  return { props: { postListWidgetInitialState: null } };
};

export default PostListScreen;
