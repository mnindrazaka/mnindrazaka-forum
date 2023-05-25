import React from "react";
import { match } from "ts-pattern";
import { Post } from "../models";
import { getPostList } from "../repositories";

type SortBy = "hot" | "new";

type PostListWidgetState =
  | {
      type: "idle";
    }
  | {
      type: "loading";
      query: string;
      sortBy: SortBy;
    }
  | {
      type: "loadingError";
      errorMessage: string;
      query: string;
      sortBy: SortBy;
    }
  | {
      type: "main";
      posts: Post[];
      page: number;
      hasNextPage: boolean;
      query: string;
      sortBy: SortBy;
    }
  | {
      type: "loadingMore";
      posts: Post[];
      page: number;
      hasNextPage: boolean;
      query: string;
      sortBy: SortBy;
    }
  | {
      type: "loadingMoreError";
      posts: Post[];
      errorMessage: string;
      page: number;
      hasNextPage: boolean;
      query: string;
      sortBy: SortBy;
    };

type PostListWidgetAction =
  | {
      type: "fetch";
    }
  | {
      type: "updateQuery";
      query: string;
    }
  | {
      type: "updateSortBy";
      sortBy: SortBy;
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
    .with([{ type: "idle" }, { type: "fetch" }], () => ({
      type: "loading",
      query: "",
      sortBy: "new",
    }))
    .with(
      [{ type: "loading" }, { type: "updateQuery" }],
      ([state, action]) => ({
        type: "loading",
        query: action.query,
        sortBy: state.sortBy,
      })
    )
    .with(
      [{ type: "loading" }, { type: "updateSortBy" }],
      ([state, action]) => ({
        type: "loading",
        query: state.query,
        sortBy: action.sortBy,
      })
    )
    .with(
      [{ type: "loading" }, { type: "fetchSuccess" }],
      ([state, action]) => ({
        type: "main",
        posts: action.posts,
        page: 1,
        hasNextPage: action.hasNextPage,
        query: state.query,
        sortBy: state.sortBy,
      })
    )
    .with([{ type: "loading" }, { type: "fetchError" }], ([state, action]) => ({
      type: "loadingError",
      errorMessage: action.errorMessage,
      query: state.query,
      sortBy: state.sortBy,
    }))
    .with([{ type: "loadingError" }, { type: "refetch" }], ([state]) => ({
      type: "loading",
      query: state.query,
      sortBy: state.sortBy,
    }))
    .with([{ type: "main" }, { type: "updateQuery" }], ([state, action]) => ({
      type: "loading",
      query: action.query,
      sortBy: state.sortBy,
    }))
    .with([{ type: "main" }, { type: "updateSortBy" }], ([state, action]) => ({
      type: "loading",
      query: state.query,
      sortBy: action.sortBy,
    }))
    .with([{ type: "main" }, { type: "fetchMore" }], ([state, _]) => ({
      type: "loadingMore",
      posts: state.posts,
      page: state.page + 1,
      hasNextPage: state.hasNextPage,
      query: state.query,
      sortBy: state.sortBy,
    }))
    .with(
      [{ type: "loadingMore" }, { type: "fetchMoreSuccess" }],
      ([state, action]) => ({
        type: "main",
        posts: action.posts,
        page: state.page,
        hasNextPage: action.hasNextPage,
        query: state.query,
        sortBy: state.sortBy,
      })
    )
    .with(
      [{ type: "loadingMore" }, { type: "fetchMoreError" }],
      ([state, action]) => ({
        type: "loadingMoreError",
        posts: state.posts,
        errorMessage: action.errorMessage,
        page: state.page,
        hasNextPage: state.hasNextPage,
        query: state.query,
        sortBy: state.sortBy,
      })
    )
    .with(
      [{ type: "loadingMoreError" }, { type: "refetchMore" }],
      ([state]) => ({
        type: "loadingMore",
        posts: state.posts,
        page: state.page,
        hasNextPage: state.hasNextPage,
        query: state.query,
        sortBy: state.sortBy,
      })
    )
    .with(
      [{ type: "loadingMoreError" }, { type: "fetchMoreCancel" }],
      ([state]) => ({
        type: "main",
        posts: state.posts,
        page: state.page - 1,
        hasNextPage: state.hasNextPage,
        query: state.query,
        sortBy: state.sortBy,
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
    .with({ type: "loading" }, (state) => {
      getPostList({
        page: 1,
        pageSize: 1,
        query: state.query,
        sortBy: state.sortBy,
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
        sortBy: state.sortBy,
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
