import React from "react";
import { match } from "ts-pattern";
import { Post } from "../models";
import {
  GetPostListParams,
  getPostList,
  updateQueryURL,
} from "../repositories";

export type SortBy = "hot" | "new";

type PostListWidgetContext = {
  query: string;
  sortBy: SortBy;
  errorMessage: string | null;
  posts: Post[];
  page: number;
  hasNextPage: boolean;
};

export type PostListWidgetState = PostListWidgetContext &
  (
    | { type: "idle" }
    | { type: "loading" }
    | { type: "loadingError"; errorMessage: string }
    | { type: "main" }
    | { type: "loadingMore" }
    | { type: "loadingMoreError"; errorMessage: string }
  );

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
    .with([{ type: "idle" }, { type: "fetch" }], ([state]) => ({
      ...state,
      type: "loading",
    }))
    .with(
      [{ type: "loading" }, { type: "updateQuery" }],
      ([state, action]) => ({ ...state, query: action.query })
    )
    .with(
      [{ type: "loading" }, { type: "updateSortBy" }],
      ([state, action]) => ({ ...state, sortBy: action.sortBy })
    )
    .with(
      [{ type: "loading" }, { type: "fetchSuccess" }],
      ([state, action]) => ({
        ...state,
        type: "main",
        posts: action.posts,
        page: 1,
        hasNextPage: action.hasNextPage,
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
    .with([{ type: "main" }, { type: "updateQuery" }], ([state, action]) => ({
      ...state,
      type: "loading",
      query: action.query,
    }))
    .with([{ type: "main" }, { type: "updateSortBy" }], ([state, action]) => ({
      ...state,
      type: "loading",
      sortBy: action.sortBy,
    }))
    .with([{ type: "main" }, { type: "fetchMore" }], ([state, _]) => ({
      ...state,
      type: "loadingMore",
      page: state.page + 1,
    }))
    .with(
      [{ type: "loadingMore" }, { type: "fetchMoreSuccess" }],
      ([state, action]) => ({
        ...state,
        type: "main",
        posts: action.posts,
        hasNextPage: action.hasNextPage,
      })
    )
    .with(
      [{ type: "loadingMore" }, { type: "fetchMoreError" }],
      ([state, action]) => ({
        ...state,
        type: "loadingMoreError",
        errorMessage: action.errorMessage,
      })
    )
    .with(
      [{ type: "loadingMoreError" }, { type: "refetchMore" }],
      ([state]) => ({ ...state, type: "loadingMore" })
    )
    .with(
      [{ type: "loadingMoreError" }, { type: "fetchMoreCancel" }],
      ([state]) => ({
        ...state,
        type: "main",
        page: state.page - 1,
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
      updateQueryURL({ query: state.query, sortBy: state.sortBy });
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

export const getPostListWidgetInitialState = async (
  params: Required<GetPostListParams>
): Promise<PostListWidgetState> => {
  try {
    const { posts, hasNextPage } = await getPostList(params);
    return {
      ...params,
      type: "main",
      posts,
      hasNextPage,
      errorMessage: null,
    };
  } catch {
    return {
      type: "idle",
      errorMessage: null,
      hasNextPage: false,
      page: 1,
      posts: [],
      query: "",
      sortBy: "new",
    };
  }
};

export const usePostListWidgetReducer = (
  initialState?: PostListWidgetState
) => {
  const [state, send] = React.useReducer(
    reducer,
    initialState ?? {
      type: "idle",
      query: "",
      sortBy: "new",
      errorMessage: null,
      posts: [],
      page: 1,
      hasNextPage: false,
    }
  );

  React.useEffect(() => {
    onStateChange(state, send);
  }, [state]);

  return [state, send] as const;
};
