export type Comment = {
  serial: string;
  parentSerial: string | null;
  datetime: string;
  content: string;
  voteCount: number;
  postSlug: string;
};
