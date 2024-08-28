import { getUserAnswers } from "@/lib/actions/user.action";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";
import { ANSWERS_PAGE_SIZE } from "@/constants";

interface AnswerTabProps {
  searchParams: { [key: string]: string | undefined };
  userId: string;
  clerkId?: string | null;
  pageNumber: number;
}

const AnswerTab = async ({
  searchParams,
  userId,
  clerkId,
  pageNumber,
}: AnswerTabProps) => {
  const result = await getUserAnswers({
    userId,
    page: pageNumber,
  });

  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          key={item._id}
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
          content={item.content}
        />
      ))}
      <Pagination
        pageNumber={pageNumber}
        isNext={result.isNextAnswers}
        totalPages={Math.ceil(result.totalAnswers / ANSWERS_PAGE_SIZE)}
        tabName="answers"
      />
    </>
  );
};

export default AnswerTab;
