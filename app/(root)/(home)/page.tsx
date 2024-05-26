import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/Search/LocalSearchBar";
import HomeFilters from "@/components/home/HomeFilters";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";

const questions = [
  {
    _id: "1",
    title: "Cascading Deletes in SQLAlchemy?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "author1",
      name: "John Doe",
      picture: "https://example.com/picture1.jpg",
    },
    upvotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date("2024-05-10T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How to center a div",
    tags: [
      { _id: "3", name: "html" },
      { _id: "4", name: "css" },
    ],
    author: {
      _id: "author2",
      name: "Jane Smith",
      picture: "https://example.com/picture2.jpg",
    },
    upvotes: 1500000,
    views: 20000000,
    answers: [],
    createdAt: new Date("2023-09-11T12:00:00.000Z"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
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
        {questions.length > 0 ? (
          questions.map(
            ({
              _id,
              title,
              tags,
              author,
              upvotes,
              views,
              answers,
              createdAt,
            }) => (
              <QuestionCard
                key={_id}
                _id={_id}
                title={title}
                tags={tags}
                author={author}
                upvotes={upvotes}
                views={views}
                answers={answers}
                createdAt={createdAt}
              />
            )
          )
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
    </>
  );
}
