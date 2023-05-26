import { PostDetailScreen, PostDetailScreenProps } from "@/posts/screens";
import { getQuery } from "@/utils";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<
  PostDetailScreenProps
> = async (ctx) => {
  const slug = getQuery(ctx.query.slug, "");
  return { props: { slug } };
};

export default PostDetailScreen;
