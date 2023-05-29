import { Meta, StoryFn } from "@storybook/react";
import { CommentListWidget } from "./CommentListWidget";
import { posts } from "@/fakers";
import {
  userEvent,
  waitForElementToBeRemoved,
  within,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  component: CommentListWidget,
} as Meta<typeof CommentListWidget>;

const Template: StoryFn<typeof CommentListWidget> = (args) => (
  <CommentListWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  postSlug: posts[0].slug,
};
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("input comment", async () => {
    await Promise.resolve(
      userEvent.type(
        await canvas.findByRole(
          "textbox",
          {
            name: /content/i,
          },
          { timeout: 5000 }
        ),
        "This is example comment"
      )
    );
    await Promise.resolve(
      expect(
        canvas.getByRole("textbox", {
          name: /content/i,
        })
      ).toHaveValue("This is example comment")
    );
  });

  await step("submit form", async () => {
    await Promise.resolve(
      userEvent.click(
        canvas.getByRole("button", {
          name: /submit/i,
        })
      )
    );
    await waitForElementToBeRemoved(() => canvas.queryAllByRole("progressbar"));

    await Promise.resolve(
      expect(
        canvas.getByRole("textbox", {
          name: /content/i,
        })
      ).toHaveValue("")
    );

    await Promise.resolve(
      expect(
        canvas.getAllByText("This is example comment")[0]
      ).toBeInTheDocument()
    );
  });
};

export const IsEmpty = Template.bind({});
IsEmpty.args = {
  postSlug: posts[0].slug,
  initialState: {
    type: "main",
    comments: [],
    errorMessage: null,
    postSlug: posts[0].slug,
  },
};
