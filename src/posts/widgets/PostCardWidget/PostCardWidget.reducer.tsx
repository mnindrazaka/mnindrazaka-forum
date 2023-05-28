import React from "react";
import { match } from "ts-pattern";
import { votePost } from "../../repositories";

type PostCardWidgetContext = {
  slug: string;
  voteChangeAmount: number;
  voteCount: number;
};

type PostCardWidgetState = PostCardWidgetContext &
  ({ type: "main" } | { type: "voting" });

type PostCardWidgetAction =
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
  prevState: PostCardWidgetState,
  action: PostCardWidgetAction
): PostCardWidgetState => {
  return match<
    [PostCardWidgetState, PostCardWidgetAction],
    PostCardWidgetState
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
  nextState: PostCardWidgetState,
  send: (action: PostCardWidgetAction) => void
) => {
  match(nextState)
    .with({ type: "voting" }, (state) => {
      votePost({
        slug: state.slug,
        amount: state.voteChangeAmount,
      })
        .then(() => send({ type: "updateVoteSuccess" }))
        .catch(() => send({ type: "updateVoteError" }));
    })
    .otherwise(() => {});
};

type UsePostCardWidgetReducerParams = {
  slug: string;
  voteCount: number;
};

export const usePostCardWidgetReducer = ({
  slug,
  voteCount,
}: UsePostCardWidgetReducerParams) => {
  const [state, send] = React.useReducer(reducer, {
    type: "main",
    voteChangeAmount: 0,
    voteCount,
    slug,
  });

  React.useEffect(() => {
    onStateChange(state, send);
  }, [state]);

  return [state, send] as const;
};
