export type Comment = {
  serial: string;
  datetime: string;
  content: string;
  vote: number;
  comments: Comment[];
};
