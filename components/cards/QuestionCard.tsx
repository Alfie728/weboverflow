import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface QuestionProps {
  clerkId?: string | null;
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: {
    _id: string;
    name: string;
    username: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;
  return (
    <>
      <div className="card-wrapper rounded-[10px] border p-9 shadow-lg transition-transform hover:scale-105 hover:bg-light-800 hover:shadow-xl dark:hover:bg-dark-400 sm:px-11">
        <div className="flex items-start justify-between gap-5 max-[550px]:flex-col-reverse max-[550px]:gap-2.5">
          <div className="flex-1">
            <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
              {getTimestamp(createdAt)}
            </span>
            <Link href={`/question/${_id}`}>
              <h3 className="sm:h3-semibold base-semibold text-dark200_light900  flex-1">
                {title}
              </h3>
            </Link>
          </div>

          <SignedIn>
            {showActionButtons && (
              <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
            )}
          </SignedIn>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              otherClasses="shadow-md"
            />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-3 max-[550px]:grid max-[550px]:grid-cols-2">
          <Metric
            imgURL={author.picture}
            alt="user"
            value={author.name ? author.name : author.username}
            title={` - asked ${getTimestamp(createdAt)}`}
            href={`/profile/${author._id}`}
            isAuthor
            textStyles="body-medium small-medium text-dark400_light800"
          />
          <Metric
            imgURL="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title="Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgURL="/assets/icons/message.svg"
            alt="message"
            value={formatAndDivideNumber(answers.length)}
            title="Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgURL="/assets/icons/eye.svg"
            alt="eye"
            value={formatAndDivideNumber(views)}
            title="Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </>
  );
};
export default QuestionCard;
