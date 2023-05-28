import React from "react";
import {
  PostDetailWidgetAction,
  PostDetailWidgetState,
} from "./PostDetailWidget.reducer";

export type PostDetailWidgetContext = {
  state: PostDetailWidgetState;
  send: (action: PostDetailWidgetAction) => void;
};

const postDetailWidgetContext = React.createContext<PostDetailWidgetContext>({
  state: {
    type: "idle",
    post: null,
    errorMessage: null,
    slug: "",
  },
  send: () => {},
});

export const usePostDetailWidgetContext = () =>
  React.useContext(postDetailWidgetContext);

export const PostDetailWidgetProvider = postDetailWidgetContext.Provider;
