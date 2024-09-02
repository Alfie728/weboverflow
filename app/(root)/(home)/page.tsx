import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/Search/LocalSearchBar";
import HomeFilters from "@/components/home/HomeFilters";
import { HomePageFilters } from "@/constants/filters";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { SearchParamsProps, QuestionProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import HomepageWrapper from "./HomepageWrapper";
import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { Suspense, use } from 'react';

export const metadata: Metadata = {
  title: "Home | Web Overflow",
  description: "Home page",
};

const NextPageLoader = ({ data }: { data: Promise<any> }) => {
  use(data);
  return null;
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  const currentPage = searchParams.page ? +searchParams.page : 1;

  // Function to fetch data for a specific page
  const fetchPageData = async (page: number) => {
    const params = { ...searchParams, page: page.toString() } as { page: string; filter?: string; q?: string };
    if (params.filter === "recommended" && userId) {
      return getRecommendedQuestions({
        userId,
        page,
      });
    } else {
      return getQuestions({
        searchQuery: params.q,
        filter: params.filter,
        page,
      });
    }
  };

  // Fetch current page data
  const currentPageData = fetchPageData(currentPage);

  // Prefetch next page data
  const nextPageData = fetchPageData(currentPage + 1);

  // Wait for current page data
  const result = await currentPageData;

  return (
    <HomepageWrapper>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions...  "
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: QuestionProps) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </div>

      <Suspense fallback={<div>Loading next page...</div>}>
        <NextPageLoader data={nextPageData} />
      </Suspense>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
          totalPages={result.totalPages}
        />
      </div>
    </HomepageWrapper>
  );
}
