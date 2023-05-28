import { Meta, StoryFn } from "@storybook/react";
import { PostDetailWidget, PostDetailWidgetContent } from "./PostDetailWidget";
import { posts } from "@/fakers";
import {
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  component: PostDetailWidget,
} as Meta<typeof PostDetailWidget>;

const Template: StoryFn<typeof PostDetailWidget> = (args) => (
  <PostDetailWidget {...args}>
    <PostDetailWidgetContent />
  </PostDetailWidget>
);

export const Default = Template.bind({});
Default.args = {
  slug: posts[0].slug,
};
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryAllByRole("progressbar"));
  });

  await step("vote up", async () => {
    await Promise.resolve(
      userEvent.click(
        canvas.getByRole("button", {
          name: /vote\-up/i,
        })
      )
    );

    await Promise.resolve(
      expect(canvas.getByText(posts[0].voteCount + 1)).toBeInTheDocument()
    );
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
    await Promise.resolve(
      expect(canvas.getByText(posts[0].voteCount - 1)).toBeInTheDocument()
    );
  });
};

export const IsError = Template.bind({});
IsError.args = {
  slug: "no-slug-like-this",
};
IsError.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await waitFor(() => canvas.findByRole("alertdialog"));
  await Promise.resolve(
    expect(
      canvas.getByRole("heading", { name: /Something Went Wrong/i })
    ).toBeInTheDocument()
  );
};
