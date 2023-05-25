import { Meta, StoryFn } from "@storybook/react";
import { Paragraph, YStack } from "tamagui";
import { Container } from "./Container";

export default {
  component: Container,
} as Meta<typeof Container>;

const Template: StoryFn<typeof Container> = (args) => (
  <Container {...args}>{args.children}</Container>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <YStack theme="Card" padding="$2" backgroundColor="$background">
      <Paragraph>Container</Paragraph>
    </YStack>
  ),
};
