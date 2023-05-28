import React from "react";
import { match } from "ts-pattern";
import { voteComment } from "../../repositories";

type CommentCardWidgetContext = {
  serial: string;
  voteChangeAmount: number;
  voteCount: number;
};

type CommentCardWidgetState = CommentCardWidgetContext &
  ({ type: "main" } | { type: "voting" });

type CommentCardWidgetAction =
  | {
      type: "updateVote";
      amount: number;
    }
  | {
      type: "updateVoteSuccess";
    }
  | {
      type: "updateVoteError";
    };

const reducer = (
  prevState: CommentCardWidgetState,
  action: CommentCardWidgetAction
): CommentCardWidgetState => {
  return match<
    [CommentCardWidgetState, CommentCardWidgetAction],
    CommentCardWidgetState
  >([prevState, action])
    .with([{ type: "main" }, { type: "updateVote" }], ([state, action]) => ({
      ...state,
      type: "voting",
      voteChangeAmount: action.amount,
    }))
    .with([{ type: "voting" }, { type: "updateVoteSuccess" }], ([state]) => ({
      ...state,
      type: "main",
      voteChangeAmount: 0,
      voteCount: state.voteCount + state.voteChangeAmount,
    }))
    .with([{ type: "voting" }, { type: "updateVoteError" }], ([state]) => ({
      ...state,
      type: "main",
      voteChangeAmount: 0,
    }))
    .otherwise(() => prevState);
};

const onStateChange = (
  nextState: CommentCardWidgetState,
  send: (action: CommentCardWidgetAction) => void
) => {
  match(nextState)
    .with({ type: "voting" }, (state) => {
      voteComment({
        serial: state.serial,
        amount: state.voteChangeAmount,
      })
        .then(() => send({ type: "updateVoteSuccess" }))
        .catch(() => send({ type: "updateVoteError" }));
    })
    .otherwise(() => {});
};

type UseCommentCardWidgetReducerParams = {
  serial: string;
  voteCount: number;
};

export const useCommentCardWidgetReducer = ({
  serial,
  voteCount,
}: UseCommentCardWidgetReducerParams) => {
  const [state, send] = React.useReducer(reducer, {
    type: "main",
    voteChangeAmount: 0,
    voteCount,
    serial,
  });

  React.useEffect(() => {
    onStateChange(state, send);
  }, [state]);

  return [state, send] as const;
};
