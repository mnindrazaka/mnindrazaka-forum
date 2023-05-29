import { Meta, StoryFn } from "@storybook/react";
import { PostFormWidget } from "./PostFormWidget";
import {
  userEvent,
  waitForElementToBeRemoved,
  within,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  component: PostFormWidget,
} as Meta<typeof PostFormWidget>;

const Template: StoryFn<typeof PostFormWidget> = (args) => (
  <PostFormWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {};
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  await step("input title", async () => {
    await Promise.resolve(
      userEvent.type(
        canvas.getByRole("textbox", {
          name: /title/i,
        }),
        "This is example title"
      )
    );
    await Promise.resolve(
      expect(
        canvas.getByRole("textbox", {
          name: /title/i,
        })
      ).toHaveValue("This is example title")
    );
  });

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
    await Promise.resolve(
      expect(canvas.getByText("23 / 255")).toBeInTheDocument()
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
          name: /title/i,
        })
      ).toHaveValue("")
    );

    await Promise.resolve(
      expect(
        canvas.getByRole("textbox", {
          name: /content/i,
        })
      ).toHaveValue("")
    );

    await Promise.resolve(
      expect(canvas.getByText("0 / 255")).toBeInTheDocument()
    );
  });
};
