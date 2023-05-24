import { Flame, Tag } from "@tamagui/lucide-icons";
import React from "react";
import { Button, ButtonProps, Input, XStack, XStackProps } from "tamagui";

type SortVariant = "hot" | "new";

export type PostFilterProps = {
  searchValue: string;
  onChangeSearchValue: (searchValue: string) => void;
  selectedSort: SortVariant;
  onChangeSort: (sort: SortVariant) => void;
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
    onPress: () => onChangeSort(sort),
  });
  return (
    <XStack
      space="$4"
      theme="Card"
      backgroundColor="$background"
      padding="$4"
      borderRadius="$5"
      borderColor="$borderColor"
      justifyContent="space-between"
      {...containerProps}
    >
      <Input
        placeholder="Search Post"
        minWidth={320}
        value={searchValue}
        onChangeText={onChangeSearchValue}
      />
      <XStack space="$2">
        <Button icon={<Flame />} {...getSortButtonProps("hot")}>
          Hot
        </Button>
        <Button icon={<Tag />} {...getSortButtonProps("new")}>
          New
        </Button>
      </XStack>
    </XStack>
  );
}
