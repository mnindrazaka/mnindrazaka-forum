import React from "react";
import {
  CommentListWidgetState,
  useCommentListWidgetReducer,
} from "./CommentListWidget.reducer";
import {
  AlertDialog,
  Button,
  H3,
  H4,
  Paragraph,
  XStack,
  YStack,
} from "tamagui";
import { match } from "ts-pattern";
import { Skeleton } from "@/uikits";
import { CommentCardWidget } from "../CommentCardWidget";
import * as fakers from "@/fakers";
import { CommentFormWidget } from "../CommentFormWidget";
import { Comment } from "../../models";
import {
  CornerRightDown,
  CornerRightUp,
  PackageOpen,
} from "@tamagui/lucide-icons";

type NestedCommentListWidgetProps = {
  comments: Comment[];
  comment: Comment;
  postSlug: string;
  onSubmitSuccess: () => void;
};

function NestedCommentListWidget({
  comments,
  comment,
  postSlug,
  onSubmitSuccess,
}: NestedCommentListWidgetProps) {
  const [showReplies, setShowReplies] = React.useState(false);
  const [showReplyForm, setShowReplyForm] = React.useState(false);

  const childrenComments = comments.filter(
    (nestedComment) => nestedComment.parentSerial === comment.serial
  );

  return (
    <YStack space="$3">
      <CommentCardWidget
        {...comment}
        onCommentButtonPress={() => setShowReplyForm(!showReplyForm)}
      />
      {showReplyForm && (
        <CommentFormWidget
          postSlug={postSlug}
          parentSerial={comment.serial}
          onSubmitSuccess={() => {
            setShowReplyForm(false);
            setShowReplies(true);
            onSubmitSuccess();
          }}
        />
      )}

      {childrenComments.length > 0 && (
        <XStack>
          <Button
            onPress={() => setShowReplies(!showReplies)}
            size="$2"
            iconAfter={showReplies ? CornerRightUp : CornerRightDown}
          >
            {showReplies ? "Hide Replies" : "Show Replies"}
          </Button>
        </XStack>
      )}

      {showReplies && (
        <XStack>
          <YStack
            borderLeftWidth={1}
            borderColor="$borderColor"
            onPress={() => setShowReplies(false)}
            cursor="pointer"
            width="$1"
          />
          <YStack space="$3">
            {childrenComments.map((nestedComment) => (
              <NestedCommentListWidget
                key={nestedComment.serial}
                comment={nestedComment}
                comments={comments}
                onSubmitSuccess={onSubmitSuccess}
                postSlug={postSlug}
              />
            ))}
          </YStack>
        </XStack>
      )}
    </YStack>
  );
}

export type CommentListWidgetProps = {
  postSlug: string;
  initialState?: CommentListWidgetState | null;
  onSubmitSuccess?: () => void;
};

export function CommentListWidget({
  initialState,
  postSlug,
  onSubmitSuccess,
}: CommentListWidgetProps) {
  const [state, send] = useCommentListWidgetReducer({ initialState, postSlug });

  const isLoading = match(state)
    .with({ type: "idle" }, { type: "loading" }, () => true)
    .otherwise(() => false);

  const comments = isLoading ? fakers.comments : state.comments;

  const handleSubmitSuccess = () => {
    send({ type: "refetch" });
    if (onSubmitSuccess) onSubmitSuccess();
  };

  const parentComments = comments.filter(
    (comment) => comment.parentSerial === null
  );

  return (
    <Skeleton isLoading={isLoading}>
      <YStack space="$3">
        <CommentFormWidget
          postSlug={postSlug}
          parentSerial={null}
          onSubmitSuccess={handleSubmitSuccess}
        />

        <YStack space="$3">
          {parentComments.length > 0 ? (
            parentComments.map((comment) => (
              <NestedCommentListWidget
                key={comment.serial}
                comment={comment}
                comments={comments}
                postSlug={postSlug}
                onSubmitSuccess={handleSubmitSuccess}
              />
            ))
          ) : (
            <YStack alignItems="center" space="$3">
              <PackageOpen size="$4" />
              <H4>No Comment Yet</H4>
            </YStack>
          )}
        </YStack>

        <AlertDialog open={state.type === "loadingError"}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <YStack space="$3">
                <H3>Something Went Wrong</H3>
                <Paragraph>{state.errorMessage}</Paragraph>
                <XStack space="$3">
                  <Button onPress={() => send({ type: "refetch" })}>
                    Retry
                  </Button>
                </XStack>
              </YStack>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog>
      </YStack>
    </Skeleton>
  );
}
