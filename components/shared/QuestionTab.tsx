import { getUserQuestions } from "@/lib/actions/user.action";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";
import { QUESTIONS_PAGE_SIZE } from "@/constants";

interface QuestionTabProps {
  searchParams: { [key: string]: string | undefined };
  userId: string;
  clerkId?: string | null;
  pageNumber: number;
  searchQuery: string;
}

const QuestionTab = async ({
  searchParams,
  userId,
  clerkId,
  pageNumber,
  searchQuery,
}: QuestionTabProps) => {
  const result = await getUserQuestions({
    userId,
    page: pageNumber,
    searchQuery,
  });

  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}

      <Pagination
        pageNumber={pageNumber}
        isNext={result.isNextQuestions}
        totalPages={Math.ceil(result.totalQuestions / QUESTIONS_PAGE_SIZE)}
        tabName="questions"
      />
    </>
  );
};

export default QuestionTab;
