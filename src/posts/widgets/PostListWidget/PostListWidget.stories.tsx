import { Meta, StoryFn } from "@storybook/react";
import { PostListWidget } from "./PostListWidget";
import {
  userEvent,
  waitForElementToBeRemoved,
  within,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { posts } from "@/fakers";

export default {
  component: PostListWidget,
} as Meta<typeof PostListWidget>;

const Template: StoryFn<typeof PostListWidget> = (args) => (
  <PostListWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {};
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryAllByRole("progressbar"));
  });

  await step("click new button", async () => {
    await Promise.resolve(
      userEvent.click(
        canvas.getByRole("button", {
          name: /new/i,
        })
      )
    );
    await waitForElementToBeRemoved(() => canvas.queryAllByRole("progressbar"));
    await Promise.resolve(
      expect(canvas.getByText("Iusto libero nemo dicta ea qui."))
    );
  });

  await step("search random query", async () => {
    await Promise.resolve(
      userEvent.type(
        canvas.getByRole("textbox", {
          name: /search post/i,
        }),
        "this is random string",
        { delay: 50 }
      )
    );
    await waitForElementToBeRemoved(() => canvas.queryAllByRole("progressbar"));

    await Promise.resolve(expect(canvas.getByText(/no post yet/i)));
  });
};

export const IsEmpty = Template.bind({});
IsEmpty.args = {
  initialState: {
    type: "main",
    hasNextPage: false,
    page: 1,
    posts: [],
    query: "",
    sortBy: "hot",
    errorMessage: null,
  },
};
