"use client";

import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { upvoteAnswer, downvoteAnswer } from "@/lib/actions/answer.action";
import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { useEffect } from "react";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { toast } from "@/hooks/use-toast";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpVoted: boolean;
  downvotes: number;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpVoted,
  downvotes,
  hasDownVoted,
  hasSaved,
}: Props) => {
  const cleanItemId = itemId.replace(/^"|"$/g, "");
  const cleanUserId = userId ? userId.replace(/^"|"$/g, "") : "";
  const pathname = usePathname();
  const router = useRouter();

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: cleanUserId,
      questionId: cleanItemId,
      path: pathname,
    });
    return toast({
      title: `Question ${!hasSaved ? "Saved" : "Removed"}`,
      description: !hasSaved
        ? "You have successfully saved this question!"
        : "You have successfully removed your saved question!",
      variant: !hasSaved ? "default" : "destructive",
    });
  };

  const handleVote = async (action: string) => {
    if (!cleanUserId) {
      return toast({
        title: "Please Login",
        description: "You need to login to continue!",
        variant: "destructive",
      });
    }

    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: cleanItemId,
          userId: cleanUserId,
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: cleanItemId,
          userId: cleanUserId,
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      }

      // TODO: show a toast

      return toast({
        title: `Upvote ${!hasUpVoted ? "Successful" : "Removed"}`,
        description: !hasUpVoted
          ? "You have successfully upvoted!"
          : "You have successfully removed your upvote!",
        variant: !hasUpVoted ? "default" : "destructive",
      });
    }
    if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: cleanItemId,
          userId: cleanUserId,
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: cleanItemId,
          userId: cleanUserId,
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      }

      // TODO: show a toast
      return toast({
        title: `Downvote ${!hasDownVoted ? "Successful" : "Removed"}`,
        description: !hasDownVoted
          ? "You have successfully downvoted!"
          : "You have successfully removed your downvote!",
        variant: !hasDownVoted ? "default" : "destructive",
      });
    }
  };

  useEffect(() => {
    if (type === "Question") {
      viewQuestion({
        questionId: cleanItemId,
        userId: cleanUserId || undefined,
      });
    }
  }, [cleanItemId, cleanUserId, type, pathname, router]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === "Question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};
export default Votes;
