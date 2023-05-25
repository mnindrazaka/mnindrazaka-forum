import React from "react";
import { Skeleton } from "./Skeleton";
import type { Meta, StoryFn } from "@storybook/react";
import { Button, Paragraph, YStack } from "tamagui";
import { SkeletonItem } from "./SkeletonItem";

export default {
  component: Skeleton,
} as Meta<typeof Skeleton>;

const Template: StoryFn<typeof Skeleton> = (args) => (
  <Skeleton {...args}>
    <YStack space="$2">
      <SkeletonItem variant="inline">
        <Paragraph>Lorem ipsum dolor sit amet</Paragraph>
      </SkeletonItem>

      <SkeletonItem variant="inline">
        <Paragraph>Lorem ipsum dolor sit amet</Paragraph>
      </SkeletonItem>

      <SkeletonItem>
        <Button>Click Me</Button>
      </SkeletonItem>
    </YStack>
  </Skeleton>
);

export const IsNotLoading = Template.bind({});
IsNotLoading.args = {
  isLoading: false,
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  isLoading: true,
};
