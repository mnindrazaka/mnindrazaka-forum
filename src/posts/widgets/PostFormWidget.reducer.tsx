import React from "react";
import { match } from "ts-pattern";
import { createPost } from "../repositories";

type PostFormWidgetContext = {
  title: string;
  content: string;
  errorMessage: string | null;
};

export type PostFormWidgetState = PostFormWidgetContext &
  ({ type: "main" } | { type: "submitting" } | { type: "submittingError" });

export type PostFormWidgetAction =
  | { type: "updateTitle"; title: string }
  | { type: "updateContent"; content: string }
  | { type: "submit" }
  | { type: "submitSuccess" }
  | { type: "submitError"; errorMessage: string }
  | { type: "resubmit" }
  | { type: "cancelSubmit" };

const reducer = (
  prevState: PostFormWidgetState,
  action: PostFormWidgetAction
): PostFormWidgetState => {
  return match<
    [PostFormWidgetState, PostFormWidgetAction],
    PostFormWidgetState
  >([prevState, action])
    .with([{ type: "main" }, { type: "updateTitle" }], ([state, action]) => ({
      ...state,
      title: action.title,
    }))
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
      values: {
        title: "",
        content: "",
      },
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
  nextState: PostFormWidgetState,
  send: (action: PostFormWidgetAction) => void,
  config: OnStateChangeConfig
) => {
  match(nextState)
    .with({ type: "submitting" }, (state) => {
      createPost({ title: state.title, content: state.content })
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

type UsePostFormWidgetReducerParams = {
  onSubmitSuccess?: () => void;
};

export const usePostFormWidgetReducer = (
  params: UsePostFormWidgetReducerParams
) => {
  const [state, send] = React.useReducer(reducer, {
    type: "main",
    title: "",
    content: "",
    errorMessage: null,
  });

  React.useEffect(() => {
    onStateChange(state, send, { onSubmitSuccess: params.onSubmitSuccess });
  }, [params.onSubmitSuccess, state]);

  return [state, send] as const;
};
