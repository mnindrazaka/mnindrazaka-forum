export type Comment = {
  serial: string;
  datetime: string;
  content: string;
  voteCount: number;
  comments: Comment[];
  postSlug: string;
};
