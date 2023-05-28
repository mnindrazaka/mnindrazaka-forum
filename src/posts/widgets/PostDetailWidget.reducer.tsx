import React from "react";
import { match } from "ts-pattern";
import { Post } from "../models";
import { GetPostDetailParams, getPostDetail, votePost } from "../repositories";

type PostDetailWidgetContext = {
  slug: string;
  post: Post | null;
  errorMessage: string | null;
};

export type PostDetailWidgetState = PostDetailWidgetContext &
  (
    | { type: "idle" }
    | { type: "loading" }
    | { type: "error"; errorMessage: string }
    | { type: "main"; post: Post }
    | { type: "voting"; post: Post }
  );

type PostDetailWidgetAction =
  | {
      type: "fetch";
    }
  | {
      type: "fetchSuccess";
      post: Post;
    }
  | {
      type: "fetchError";
      errorMessage: string;
    }
  | {
      type: "refetch";
    };

const reducer = (
  prevState: PostDetailWidgetState,
  action: PostDetailWidgetAction
): PostDetailWidgetState => {
  return match<
    [PostDetailWidgetState, PostDetailWidgetAction],
    PostDetailWidgetState
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
        post: action.post,
      })
    )
    .with([{ type: "loading" }, { type: "fetchError" }], ([state, action]) => ({
      ...state,
      type: "error",
      errorMessage: action.errorMessage,
    }))
    .with([{ type: "error" }, { type: "refetch" }], ([state]) => ({
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
  nextState: PostDetailWidgetState,
  send: (action: PostDetailWidgetAction) => void
) => {
  match(nextState)
    .with({ type: "idle" }, () => {
      send({ type: "fetch" });
    })
    .with({ type: "loading" }, (state) => {
      getPostDetail({ slug: state.slug })
        .then(({ post }) => send({ type: "fetchSuccess", post }))
        .catch((err) =>
          send({ type: "fetchError", errorMessage: err.message })
        );
    })
    .otherwise(() => {});
};

export const getPostDetailWidgetInitialState = async (
  params: GetPostDetailParams
): Promise<PostDetailWidgetState | null> => {
  try {
    const { post } = await getPostDetail(params);
    return {
      ...params,
      type: "main",
      errorMessage: null,
      post,
    };
  } catch {
    return null;
  }
};

export type UsePostDetailWidgetReducerParams = {
  slug: string;
  initialState?: PostDetailWidgetState | null;
};

export const usePostDetailWidgetReducer = (
  params: UsePostDetailWidgetReducerParams
) => {
  const [state, send] = React.useReducer(
    reducer,
    params.initialState ?? {
      type: "idle",
      errorMessage: null,
      post: null,
      slug: params.slug,
    }
  );

  React.useEffect(() => {
    onStateChange(state, send);
  }, [state]);

  return [state, send] as const;
};
