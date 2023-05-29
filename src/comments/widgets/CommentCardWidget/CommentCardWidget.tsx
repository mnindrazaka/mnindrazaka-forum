import React from "react";
import { CommentCard } from "../../components";
import { useCommentCardWidgetReducer } from "./CommentCardWidget.reducer";
import { XStackProps, YStack } from "tamagui";

export type CommentCardWidgetProps = {
  serial: string;
  voteCount: number;
  content: string;
  datetime: string;
  onCommentButtonPress?: () => void;
  hasChildren?: boolean;
} & XStackProps;

export function CommentCardWidget({
  serial,
  voteCount,
  hasChildren,
  ...props
}: CommentCardWidgetProps) {
  const [state, send] = useCommentCardWidgetReducer({ serial, voteCount });
  return (
    <YStack space="$3">
      <CommentCard
        {...props}
        voteCount={state.voteCount + state.voteChangeAmount}
        onVoteUpPress={() => send({ type: "updateVote", amount: 1 })}
        onVoteDownPress={() => send({ type: "updateVote", amount: -1 })}
        isVoting={state.type === "voting"}
      />
    </YStack>
  );
}
