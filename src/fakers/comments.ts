import { Comment } from "@/comments/models";
import { nanoid } from "nanoid";
import { simulateFetch } from "./utils";
import { posts } from "./posts";

export const comments: Comment[] = [
  {
    content: "Mantap sangat gan",
    postSlug: posts[0].slug,
    parentSerial: null,
    voteCount: 0,
    datetime: "2023-05-28T07:24:17.863Z",
    serial: "zI1VFRS8GZPQWeoAh-jaP",
  },
  {
    content: "Keren sekali kontennya",
    postSlug: posts[0].slug,
    parentSerial: null,
    voteCount: 0,
    datetime: "2023-05-28T07:24:31.939Z",
    serial: "jVM94sFQB4VPWXlWlgh2E",
  },
  {
    content: "Ini gokil sih",
    postSlug: posts[0].slug,
    parentSerial: null,
    voteCount: 0,
    datetime: "2023-05-28T07:24:36.671Z",
    serial: "57ITs3riQXtE3F8APG08w",
  },
];

type GetCommentListParams = {
  postSlug: string;
};

export function getCommentList({ postSlug }: GetCommentListParams) {
  console.log(comments);

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
    const index = posts.findIndex((post) => post.slug === comment.postSlug);
    if (index === -1) throw new Error("Post is not found");
    posts[index].commentCount++;

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
