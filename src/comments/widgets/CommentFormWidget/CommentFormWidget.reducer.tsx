import React from "react";
import { match } from "ts-pattern";
import { createComment } from "../../repositories";

type CommentFormWidgetContext = {
  postSlug: string;
  parentSerial: string | null;
  content: string;
  errorMessage: string | null;
};

export type CommentFormWidgetState = CommentFormWidgetContext &
  ({ type: "main" } | { type: "submitting" } | { type: "submittingError" });

export type CommentFormWidgetAction =
  | { type: "updateTitle"; title: string }
  | { type: "updateContent"; content: string }
  | { type: "submit" }
  | { type: "submitSuccess" }
  | { type: "submitError"; errorMessage: string }
  | { type: "resubmit" }
  | { type: "cancelSubmit" };

const reducer = (
  prevState: CommentFormWidgetState,
  action: CommentFormWidgetAction
): CommentFormWidgetState => {
  return match<
    [CommentFormWidgetState, CommentFormWidgetAction],
    CommentFormWidgetState
  >([prevState, action])
    .with([{ type: "main" }, { type: "updateContent" }], ([state, action]) => ({
      ...state,
      content: action.content,
    }))
    .with([{ type: "main" }, { type: "submit" }], ([state]) => ({
      ...state,
      type: "submitting",
    }))
    .with([{ type: "submitting" }, { type: "submitSuccess" }], ([state]) => ({
      ...state,
      type: "main",
      content: "",
    }))
    .with(
      [{ type: "submitting" }, { type: "submitError" }],
      ([state, action]) => ({
        ...state,
        type: "submittingError",
        errorMessage: action.errorMessage,
      })
    )
    .with(
      [{ type: "submittingError" }, { type: "cancelSubmit" }],
      ([state]) => ({
        ...state,
        type: "main",
        errorMessage: null,
      })
    )
    .with([{ type: "submittingError" }, { type: "resubmit" }], ([state]) => ({
      ...state,
      type: "submitting",
      errorMessage: null,
    }))
    .otherwise(() => prevState);
};

type OnStateChangeConfig = {
  onSubmitSuccess?: () => void;
};

const onStateChange = (
  nextState: CommentFormWidgetState,
  send: (action: CommentFormWidgetAction) => void,
  config: OnStateChangeConfig
) => {
  match(nextState)
    .with({ type: "submitting" }, (state) => {
      createComment({
        content: state.content,
        postSlug: state.postSlug,
        parentSerial: state.parentSerial,
      })
        .then(() => {
          send({ type: "submitSuccess" });
          if (config.onSubmitSuccess) config.onSubmitSuccess();
        })
        .catch((err) =>
          send({ type: "submitError", errorMessage: err.message })
        );
    })
    .otherwise(() => {});
};

type UseCommentFormWidgetReducerParams = {
  onSubmitSuccess?: () => void;
  postSlug: string;
  parentSerial: string | null;
};

export const useCommentFormWidgetReducer = (
  params: UseCommentFormWidgetReducerParams
) => {
  const [state, send] = React.useReducer(reducer, {
    type: "main",
    content: "",
    errorMessage: null,
    postSlug: params.postSlug,
    parentSerial: params.parentSerial,
  });

  React.useEffect(() => {
    onStateChange(state, send, { onSubmitSuccess: params.onSubmitSuccess });
  }, [params.onSubmitSuccess, state]);

  return [state, send] as const;
};
