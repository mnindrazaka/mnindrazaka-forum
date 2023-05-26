import { Comment } from "@/comments/models";
import { nanoid } from "nanoid";
import { simulateFetch } from "./utils";

export const comments: Comment[] = [
  {
    voteCount: 500,
    content: "Lorem Ipsum Dolor Sit Amet",
    datetime: new Date("May 25, 2023 12:00:00").toISOString(),
    serial: "1",
    comments: [],
    postSlug: "hokage-terbaik-sepanjang-sejarah-konoha",
  },
  {
    voteCount: 1000,
    content: "Lorem Ipsum Dolor Sit Amet",
    datetime: new Date("May 23, 2023 12:00:00").toISOString(),
    serial: "2",
    comments: [],
    postSlug: "hokage-terbaik-sepanjang-sejarah-konoha",
  },
  {
    voteCount: 255,
    content: "Lorem Ipsum Dolor Sit Amet",
    datetime: new Date("May 20, 2023 12:00:00").toISOString(),
    serial: "3",
    comments: [],
    postSlug: "hokage-terbaik-sepanjang-sejarah-konoha",
  },
];

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
  comment: Omit<Comment, "serial" | "datetime" | "voteCount" | "comments">;
};

export function createComment({ comment }: CreateCommentParams) {
  return simulateFetch(() => {
    const newComment: Comment = {
      ...comment,
      voteCount: 0,
      datetime: new Date().toISOString(),
      serial: nanoid(),
      comments: [],
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
