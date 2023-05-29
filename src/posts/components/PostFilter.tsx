import { Flame, Tag } from "@tamagui/lucide-icons";
import React from "react";
import {
  Button,
  ButtonProps,
  Input,
  XStack,
  XStackProps,
  YStack,
} from "tamagui";

type SortVariant = "hot" | "new";

export type PostFilterProps = {
  searchValue: string;
  onChangeSearchValue?: (searchValue: string) => void;
  selectedSort: SortVariant;
  onChangeSort?: (sort: SortVariant) => void;
} & XStackProps;

export function PostFilter({
  searchValue,
  onChangeSearchValue,
  selectedSort,
  onChangeSort,
  ...containerProps
}: PostFilterProps) {
  const getSortButtonProps = (sort: SortVariant): ButtonProps => ({
    backgroundColor:
      sort === selectedSort ? "$background" : "$backgroundStrong",
    disabled: sort === selectedSort,
    onPress: onChangeSort ? () => onChangeSort(sort) : undefined,
  });
  return (
    <YStack
      space="$4"
      theme="Card"
      backgroundColor="$background"
      padding="$4"
      borderRadius="$5"
      borderColor="$borderColor"
      justifyContent="space-between"
      $gtXs={{ flexDirection: "row" }}
      {...containerProps}
    >
      <Input
        aria-label="search post"
        placeholder="Search Post"
        width="100%"
        maxWidth="100%"
        value={searchValue}
        onChangeText={onChangeSearchValue}
        flexShrink={1}
        $gtXs={{ maxWidth: 320 }}
      />
      <XStack gap="$3" flexWrap="wrap">
        <Button icon={<Flame />} {...getSortButtonProps("hot")}>
          Hot
        </Button>
        <Button icon={<Tag />} {...getSortButtonProps("new")}>
          New
        </Button>
      </XStack>
    </YStack>
  );
}
