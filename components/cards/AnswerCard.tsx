import Link from "next/link";

import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <Link
      href={`/question/${question?._id}/#${_id}`}
      className="card-wrapper rounded-[10px] border p-9 shadow-lg transition-transform hover:scale-105 hover:bg-light-800 hover:shadow-xl dark:hover:bg-dark-400 sm:px-11"
    >
      <div className="flex items-start justify-between gap-5 max-[550px]:flex-col-reverse max-[550px]:gap-2.5">
        <div className="flex-1">
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900  flex-1">
            {question.title}
          </h3>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-3 max-[550px]:grid max-[550px]:grid-cols-2">
        <Metric
          imgURL={author.picture}
          alt="user avatar"
          value={author.name}
          title={` • asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />

        <div className="flex-center gap-3">
          <Metric
            imgURL="/assets/icons/like.svg"
            alt="like icon"
            value={formatAndDivideNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
