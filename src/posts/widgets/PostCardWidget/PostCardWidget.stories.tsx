import { Meta, StoryFn } from "@storybook/react";
import { PostCardWidget } from "./PostCardWidget";
import { posts } from "@/fakers";
import {
  within,
  userEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  component: PostCardWidget,
} as Meta<typeof PostCardWidget>;

const Template: StoryFn<typeof PostCardWidget> = (args) => (
  <PostCardWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  commentCount: 100,
  datetime: new Date().toISOString(),
  slug: posts[0].slug,
  title: posts[0].title,
  voteCount: 255,
};
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("vote up", async () => {
    await Promise.resolve(
      userEvent.click(
        canvas.getByRole("button", {
          name: /vote\-up/i,
        })
      )
    );

    await Promise.resolve(expect(canvas.getByText(/256/i)).toBeInTheDocument());
  });

  await step("wait for voting to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"));
  });

  await step("vote down", async () => {
    await Promise.resolve(
      userEvent.click(
        canvas.getByRole("button", {
          name: /vote\-down/i,
        })
      )
    );
    await Promise.resolve(expect(canvas.getByText(/255/i)).toBeInTheDocument());
  });
};
