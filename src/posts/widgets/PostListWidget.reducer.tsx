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
      page: number;
      hasNextPage: boolean;
    }
  | {
      type: "loadingMore";
      posts: Post[];
      page: number;
      hasNextPage: boolean;
    }
  | {
      type: "loadingMoreError";
      posts: Post[];
      errorMessage: string;
      page: number;
      hasNextPage: boolean;
    };

type PostListWidgetAction =
  | {
      type: "fetch";
    }
  | {
      type: "fetchSuccess";
      posts: Post[];
      hasNextPage: boolean;
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
      hasNextPage: boolean;
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
      page: 1,
      hasNextPage: action.hasNextPage,
    }))
    .with([{ type: "loading" }, { type: "fetchError" }], ([_, action]) => ({
      type: "loadingError",
      errorMessage: action.errorMessage,
    }))
    .with([{ type: "loadingError" }, { type: "refetch" }], () => ({
      type: "loading",
    }))
    .with([{ type: "main" }, { type: "fetchMore" }], ([prevState, action]) => ({
      type: "loadingMore",
      posts: prevState.posts,
      page: prevState.page + 1,
      hasNextPage: prevState.hasNextPage,
    }))
    .with(
      [{ type: "loadingMore" }, { type: "fetchMoreSuccess" }],
      ([prevState, action]) => ({
        type: "main",
        posts: action.posts,
        page: prevState.page,
        hasNextPage: action.hasNextPage,
      })
    )
    .with(
      [{ type: "loadingMore" }, { type: "fetchMoreError" }],
      ([prevState, action]) => ({
        type: "loadingMoreError",
        posts: prevState.posts,
        errorMessage: action.errorMessage,
        page: prevState.page,
        hasNextPage: prevState.hasNextPage,
      })
    )
    .with(
      [{ type: "loadingMoreError" }, { type: "refetchMore" }],
      ([prevState]) => ({
        type: "loadingMore",
        posts: prevState.posts,
        page: prevState.page,
        hasNextPage: prevState.hasNextPage,
      })
    )
    .with(
      [{ type: "loadingMoreError" }, { type: "fetchMoreCancel" }],
      ([prevState]) => ({
        type: "main",
        posts: prevState.posts,
        page: prevState.page - 1,
        hasNextPage: prevState.hasNextPage,
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
    .with({ type: "loading" }, () => {
      getPostList({
        page: 1,
        pageSize: 1,
      })
        .then(({ posts, hasNextPage }) =>
          send({ type: "fetchSuccess", posts, hasNextPage })
        )
        .catch((err) =>
          send({ type: "fetchError", errorMessage: err.message })
        );
    })
    .with({ type: "loadingMore" }, async (state) => {
      getPostList({
        page: state.page,
        pageSize: 1,
      })
        .then(({ posts, hasNextPage }) =>
          send({
            type: "fetchMoreSuccess",
            posts: [...state.posts, ...posts],
            hasNextPage,
          })
        )
        .catch((err) =>
          send({
            type: "fetchMoreError",
            errorMessage: err.message,
          })
        );
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
