import { Comment } from "../comments/models";
import { User } from "../users/models";

export type Post = {
  serial: string;
  slug: string;
  title: string;
  datetime: string;
  content: string;
  votesCount: number;
  commentsCount: number;
  comments: Comment[];
  user: User;
};
