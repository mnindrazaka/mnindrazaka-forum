import React from "react";
import { PostCard } from "../components";
import { usePostCardWidgetReducer } from "./PostCardWidget.reducer";

export type PostCardWidgetProps = {
  slug: string;
  voteCount: number;
  title: string;
  datetime: string;
  commentCount: number;
  onCommentButtonPress?: () => void;
};

export function PostCardWidget(props: PostCardWidgetProps) {
  const [state, send] = usePostCardWidgetReducer({
    slug: props.slug,
    vote: props.voteCount,
  });
  return (
    <PostCard
      {...props}
      voteCount={state.voteCount + state.voteChangeAmount}
      onVoteUpPress={() => send({ type: "updateVote", amount: 1 })}
      onVoteDownPress={() => send({ type: "updateVote", amount: -1 })}
    />
  );
}
