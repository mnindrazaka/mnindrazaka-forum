import { User } from "../users/models";

export type Comment = {
  serial: string;
  datetime: string;
  content: string;
  vote: number;
  comments: Comment[];
  user: User;
};
