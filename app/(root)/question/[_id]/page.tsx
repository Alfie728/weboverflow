import Answer from "@/components/forms/Answer";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";
import { URLProps } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Question | Web Overflow",
  description: "Question page",
};

const page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  // console.log(clerkId);

  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
    console.log(mongoUser._id);
  }

  const result = await getQuestionById({ questionId: params._id });
  // console.log(result.upvotes);
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full justify-between gap-5 sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              alt="profile picture"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={result._id.toString()}
              userId={mongoUser ? mongoUser._id.toString() : ""}
              upvotes={result.upvotes.length}
              hasUpVoted={
                mongoUser ? result.upvotes.includes(mongoUser._id) : false
              }
              downvotes={result.downvotes.length}
              hasDownVoted={
                mongoUser ? result.downvotes.includes(mongoUser._id) : false
              }
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgURL="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(result.createdAt)}`}
          title=" Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgURL="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(result.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgURL="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(result.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={result.content} />

      <div className="mt-8 flex flex-wrap gap-1">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={result._id.toString()}
        userId={mongoUser ? mongoUser._id.toString() : ""}
        totalAnswers={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />

      {mongoUser && (
        <Answer
          question={result.content}
          questionId={result._id.toString()}
          authorId={mongoUser._id.toString()}
        />
      )}
    </>
  );
};
export default page;
