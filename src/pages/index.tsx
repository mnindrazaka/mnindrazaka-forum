import {
  PostListScreen,
  PostListScreenProps,
  getPostListScreenProps,
} from "@/posts/screens";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<
  PostListScreenProps
> = async () => {
  const props = await getPostListScreenProps({
    page: 1,
    query: "",
    sortBy: "new",
  });
  return { props };
};

export default PostListScreen;
