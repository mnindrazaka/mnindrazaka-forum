import { Meta, StoryFn } from "@storybook/react";
import { CommentFormWidget } from "./CommentFormWidget";
import {
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { posts } from "@/fakers";

export default {
  component: CommentFormWidget,
} as Meta<typeof CommentFormWidget>;

const Template: StoryFn<typeof CommentFormWidget> = (args) => (
  <CommentFormWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  postSlug: posts[0].slug,
};
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("input content", async () => {
    await Promise.resolve(
      userEvent.type(
        await canvas.findByRole(
          "textbox",
          {
            name: /content/i,
          },
          { timeout: 5000 }
        ),
        "This is example **content**"
      )
    );
    await Promise.resolve(
      expect(
        canvas.getByRole("textbox", {
          name: /content/i,
        })
      ).toHaveValue("This is example **content**")
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
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"));

    await Promise.resolve(
      expect(
        canvas.getByRole("textbox", {
          name: /content/i,
        })
      ).toHaveValue("")
    );
  });
};

export const IsError = Template.bind({});
IsError.args = {
  postSlug: "random-slug",
};
IsError.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("input content", async () => {
    await Promise.resolve(
      userEvent.type(
        await canvas.findByRole("textbox", {
          name: /content/i,
        }),
        "This is example **content**"
      )
    );
    await Promise.resolve(
      expect(
        canvas.getByRole("textbox", {
          name: /content/i,
        })
      ).toHaveValue("This is example **content**")
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
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"));

    await Promise.resolve(
      expect(
        canvas.getByRole("textbox", {
          name: /content/i,
        })
      ).toHaveValue("This is example **content**")
    );

    await waitFor(() => canvas.findByRole("alertdialog"));
    await Promise.resolve(
      expect(
        canvas.getByRole("heading", { name: /Something Went Wrong/i })
      ).toBeInTheDocument()
    );
  });
};
