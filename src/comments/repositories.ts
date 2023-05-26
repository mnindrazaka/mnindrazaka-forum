import * as fakers from "../fakers";

export type GetCommentListParams = {
  postSlug: string;
};

export async function getCommentList({ postSlug }: GetCommentListParams) {
  const { data } = await fakers.getCommentList({ postSlug });
  return { comments: data };
}

export type CreateCommentParams = {
  postSlug: string;
  content: string;
};

export async function createComment({
  postSlug,
  content,
}: CreateCommentParams) {
  const { success } = await fakers.createComment({
    comment: { content, postSlug },
  });
  return { success };
}

type VoteCommentParams = {
  serial: string;
  amount: number;
};

export function voteComment({ serial, amount }: VoteCommentParams) {
  return fakers.voteComment({ serial, amount });
}
