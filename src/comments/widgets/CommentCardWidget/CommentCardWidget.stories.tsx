import { Meta, StoryFn } from "@storybook/react";
import { CommentCardWidget } from "./CommentCardWidget";
import { comments } from "@/fakers";
import {
  userEvent,
  waitForElementToBeRemoved,
  within,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  component: CommentCardWidget,
} as Meta<typeof CommentCardWidget>;

const Template: StoryFn<typeof CommentCardWidget> = (args) => (
  <CommentCardWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  datetime: comments[0].datetime,
  voteCount: comments[0].voteCount,
  serial: comments[0].serial,
  content: comments[0].content,
};

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("vote up", async () => {
    await Promise.resolve(
      userEvent.click(
        canvas.getByRole("button", {
          name: /vote up/i,
        })
      )
    );

    await Promise.resolve(
      expect(canvas.getByText(comments[0].voteCount + 1)).toBeInTheDocument()
    );
  });

  await step("wait for voting to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"));
  });

  await step("vote down", async () => {
    await Promise.resolve(
      userEvent.click(
        canvas.getByRole("button", {
          name: /vote down/i,
        })
      )
    );
    await Promise.resolve(
      expect(canvas.getByText(comments[0].voteCount - 1)).toBeInTheDocument()
    );
  });
};
