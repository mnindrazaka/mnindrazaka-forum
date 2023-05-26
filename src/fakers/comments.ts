import { Comment } from "@/comments/models";
import { nanoid } from "nanoid";
import { simulateFetch } from "./utils";

export const comments: Comment[] = [
  {
    voteCount: 500,
    content: "Mantap",
    datetime: new Date("May 25, 2023 12:00:00").toISOString(),
    serial: "1",
    postSlug: "hokage-terbaik-sepanjang-sejarah-konoha",
    parentSerial: null,
  },
  {
    voteCount: 1000,
    content: "Cakep Sih",
    datetime: new Date("May 23, 2023 12:00:00").toISOString(),
    serial: "2",
    postSlug: "hokage-terbaik-sepanjang-sejarah-konoha",
    parentSerial: null,
  },
  {
    voteCount: 255,
    content: "Gokil",
    datetime: new Date("May 20, 2023 12:00:00").toISOString(),
    serial: "3",
    postSlug: "hokage-terbaik-sepanjang-sejarah-konoha",
    parentSerial: null,
  },
  {
    voteCount: 255,
    content: "Mantap aja atau mantap banget ?",
    datetime: new Date("May 20, 2023 12:00:00").toISOString(),
    serial: "4",
    postSlug: "hokage-terbaik-sepanjang-sejarah-konoha",
    parentSerial: "1",
  },
  {
    voteCount: 255,
    content: "Mantap joossss",
    datetime: new Date("May 20, 2023 12:00:00").toISOString(),
    serial: "5",
    postSlug: "hokage-terbaik-sepanjang-sejarah-konoha",
    parentSerial: "1",
  },
  {
    voteCount: 255,
    content: "Mantap banget lah, masak mantap aja",
    datetime: new Date("May 20, 2023 12:00:00").toISOString(),
    serial: "6",
    postSlug: "hokage-terbaik-sepanjang-sejarah-konoha",
    parentSerial: "4",
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
