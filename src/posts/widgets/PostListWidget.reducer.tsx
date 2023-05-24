import React from "react";
import { match } from "ts-pattern";
import { Post } from "../models";
import { getPostList } from "../repositories";

type PostListWidgetState =
  | {
      type: "idle";
    }
  | {
      type: "loading";
    }
  | {
      type: "loadingError";
      errorMessage: string;
    }
  | {
      type: "main";
      posts: Post[];
    }
  | {
      type: "loadingMore";
      posts: Post[];
    }
  | {
      type: "loadingMoreError";
      posts: Post[];
      errorMessage: string;
    };

type PostListWidgetAction =
  | {
      type: "fetch";
    }
  | {
      type: "fetchSuccess";
      posts: Post[];
    }
  | {
      type: "fetchError";
      errorMessage: string;
    }
  | {
      type: "refetch";
    }
  | {
      type: "fetchMore";
    }
  | {
      type: "fetchMoreSuccess";
      posts: Post[];
    }
  | {
      type: "fetchMoreError";
      errorMessage: string;
    }
  | {
      type: "refetchMore";
    }
  | {
      type: "fetchMoreCancel";
    };

const reducer = (
  prevState: PostListWidgetState,
  action: PostListWidgetAction
): PostListWidgetState => {
  return match<
    [PostListWidgetState, PostListWidgetAction],
    PostListWidgetState
  >([prevState, action])
    .with([{ type: "idle" }, { type: "fetch" }], () => ({ type: "loading" }))
    .with([{ type: "loading" }, { type: "fetchSuccess" }], ([_, action]) => ({
      type: "main",
      posts: action.posts,
    }))
    .with([{ type: "loading" }, { type: "fetchError" }], ([_, action]) => ({
      type: "loadingError",
      errorMessage: action.errorMessage,
    }))
    .with([{ type: "loadingError" }, { type: "refetch" }], () => ({
      type: "loading",
    }))
    .with([{ type: "main" }, { type: "fetchMore" }], ([prevState]) => ({
      type: "loadingMore",
      posts: prevState.posts,
    }))
    .with(
      [{ type: "loadingMore" }, { type: "fetchMoreSuccess" }],
      ([_, action]) => ({
        type: "main",
        posts: action.posts,
      })
    )
    .with(
      [{ type: "loadingMore" }, { type: "fetchMoreError" }],
      ([state, action]) => ({
        type: "loadingMoreError",
        posts: state.posts,
        errorMessage: action.errorMessage,
      })
    )
    .with(
      [{ type: "loadingMoreError" }, { type: "refetchMore" }],
      ([state]) => ({
        type: "loadingMore",
        posts: state.posts,
      })
    )
    .with(
      [{ type: "loadingMoreError" }, { type: "fetchMoreCancel" }],
      ([state]) => ({
        type: "main",
        posts: state.posts,
      })
    )
    .otherwise(() => prevState);
};

const onStateChange = (
  nextState: PostListWidgetState,
  send: (action: PostListWidgetAction) => void
) => {
  match(nextState)
    .with({ type: "idle" }, () => {
      send({ type: "fetch" });
    })
    .with({ type: "loading" }, async () => {
      const posts = await getPostList();
      send({ type: "fetchSuccess", posts });
    })
    .with({ type: "loadingMore" }, async () => {
      const posts = await getPostList();
      send({ type: "fetchMoreSuccess", posts });
    })
    .otherwise(() => {});
};

export const usePostListWidgetReducer = () => {
  const [state, send] = React.useReducer(reducer, { type: "idle" });

  React.useEffect(() => {
    onStateChange(state, send);
  }, [state]);

  return [state, send] as const;
};
