import React from "react";
import { CommentCard } from "../components";
import { useCommentCardWidgetReducer } from "./CommentCardWidget.reducer";
import { XStackProps } from "tamagui";

export type CommentCardWidgetProps = {
  serial: string;
  voteCount: number;
  title: string;
  content: string;
  datetime: string;
  onCommentButtonPress?: () => void;
} & XStackProps;

export function CommentCardWidget({
  serial,
  voteCount,
  ...props
}: CommentCardWidgetProps) {
  const [state, send] = useCommentCardWidgetReducer({ serial, voteCount });
  return (
    <CommentCard
      {...props}
      voteCount={state.voteCount + state.voteChangeAmount}
      onVoteUpPress={() => send({ type: "updateVote", amount: 1 })}
      onVoteDownPress={() => send({ type: "updateVote", amount: -1 })}
    />
  );
}
