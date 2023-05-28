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
  const sortBy = getQuery(ctx.query.sortBy, "hot");
  const { postListWidgetInitialState } = await getPostListScreenProps({
    page: 1,
    query,
    sortBy,
  });

  /*
  This code is for example purpose only.
  Currently we pass idle state to postListWidgetInitialState to prevent the browser get initial data from server,
  we need to do this because we are not sync the browser state to server (via endpoint), so the server data is obsolete
  
  TODO: implement API endpoint and pass the postListWidgetInitialState
  */
  return {
    props: {
      postListWidgetInitialState: postListWidgetInitialState
        ? {
            type: "idle",
            errorMessage: null,
            hasNextPage: false,
            page: 1,
            posts: [],
            query: postListWidgetInitialState.query,
            sortBy: postListWidgetInitialState.sortBy,
          }
        : null,
    },
  };
};

export default PostListScreen;
