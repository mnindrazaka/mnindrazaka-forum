import { Comment } from "@/comments/models";
import { nanoid } from "nanoid";
import { simulateFetch } from "./utils";

export const comments: Comment[] = [];

type GetCommentListParams = {
  postSlug: string;
};

export function getCommentList({ postSlug }: GetCommentListParams) {
  return simulateFetch(() => {
    const filteredComments = comments.filter((comment) =>
      comment.postSlug.toLowerCase().includes(postSlug)
    );
    const sortedComments = filteredComments.sort(
      (prev, next) =>
        new Date(prev.datetime).getTime() - new Date(next.datetime).getTime()
    );
    return {
      data: sortedComments,
    };
  });
}

type CreateCommentParams = {
  comment: Omit<Comment, "serial" | "datetime" | "voteCount">;
};

export function createComment({ comment }: CreateCommentParams) {
  return simulateFetch(() => {
    const newComment: Comment = {
      ...comment,
      voteCount: 0,
      datetime: new Date().toISOString(),
      serial: nanoid(),
    };

    comments.push(newComment);

    return {
      success: true,
    };
  });
}

type VoteCommentParams = {
  serial: string;
  amount: number;
};

export function voteComment({ amount, serial }: VoteCommentParams) {
  return simulateFetch(() => {
    const index = comments.findIndex((comment) => comment.serial === serial);
    if (index === -1) throw new Error("Comment serial is not found");

    comments[index] = {
      ...comments[index],
      voteCount: comments[index].voteCount + amount,
    };

    return {
      success: true,
    };
  });
}
