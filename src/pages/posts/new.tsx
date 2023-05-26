import { PostForm } from "@/posts/components";
import { YStack } from "tamagui";

export default function PostCreateScreen() {
  return (
    <YStack>
      <PostForm values={{ title: "", content: "" }} />
    </YStack>
  );
}
