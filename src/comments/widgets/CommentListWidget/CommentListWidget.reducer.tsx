import React from "react";
import { match } from "ts-pattern";
import { Comment } from "../../models";
import { getCommentList } from "../../repositories";

type CommentListWidgetContext = {
  postSlug: string;
  errorMessage: string | null;
  comments: Comment[];
};

export type CommentListWidgetState = CommentListWidgetContext &
  (
    | { type: "idle" }
    | { type: "loading" }
    | { type: "loadingError"; errorMessage: string }
    | { type: "main" }
  );

type CommentListWidgetAction =
  | {
      type: "fetch";
    }
  | {
      type: "fetchSuccess";
      comments: Comment[];
    }
  | {
      type: "fetchError";
      errorMessage: string;
    }
  | {
      type: "refetch";
    };

const reducer = (
  prevState: CommentListWidgetState,
  action: CommentListWidgetAction
): CommentListWidgetState => {
  return match<
    [CommentListWidgetState, CommentListWidgetAction],
    CommentListWidgetState
  >([prevState, action])
    .with([{ type: "idle" }, { type: "fetch" }], ([state]) => ({
      ...state,
      type: "loading",
    }))
    .with(
      [{ type: "loading" }, { type: "fetchSuccess" }],
      ([state, action]) => ({
        ...state,
        type: "main",
        comments: action.comments,
      })
    )
    .with([{ type: "loading" }, { type: "fetchError" }], ([state, action]) => ({
      ...state,
      type: "loadingError",
      errorMessage: action.errorMessage,
    }))
    .with([{ type: "loadingError" }, { type: "refetch" }], ([state]) => ({
      ...state,
      type: "loading",
    }))
    .with([{ type: "main" }, { type: "refetch" }], ([state]) => ({
      ...state,
      type: "loading",
    }))
    .otherwise(() => prevState);
};

const onStateChange = (
  nextState: CommentListWidgetState,
  send: (action: CommentListWidgetAction) => void
) => {
  match(nextState)
    .with({ type: "idle" }, () => {
      send({ type: "fetch" });
    })
    .with({ type: "loading" }, (state) => {
      getCommentList({
        postSlug: state.postSlug,
      })
        .then(({ comments }) => send({ type: "fetchSuccess", comments }))
        .catch((err) =>
          send({ type: "fetchError", errorMessage: err.message })
        );
    })
    .otherwise(() => {});
};

type UseCommentListWidgetReducerParams = {
  initialState?: CommentListWidgetState | null;
  postSlug: string;
};

export const useCommentListWidgetReducer = ({
  postSlug,
  initialState,
}: UseCommentListWidgetReducerParams) => {
  const [state, send] = React.useReducer(
    reducer,
    initialState ?? {
      type: "idle",
      postSlug,
      errorMessage: null,
      comments: [],
    }
  );

  React.useEffect(() => {
    onStateChange(state, send);
  }, [state]);

  return [state, send] as const;
};
