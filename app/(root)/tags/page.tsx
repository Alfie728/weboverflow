import LocalSearchBar from "@/components/shared/Search/LocalSearchBar";
import { TagFilters } from "@/constants/filters";
import Filter from "@/components/shared/Filter";
import { getAllTags } from "@/lib/actions/tag.action";
import NoResult from "@/components/shared/NoResult";
import Link from "next/link";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";

const page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  // console.log(result);
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search by tag name"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-4 ">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => (
            <Link
              href={`/tags/${tag.id}`}
              key={tag._id}
              className="shadow-light100_darknone @container"
            >
              <article className="background-light900_dark200 light-border flex flex-col rounded-2xl  border px-6 py-8 @[16rem]:flex-row @[16rem]:items-baseline @[16rem]:justify-between">
                <div className="background-light700_dark400 mx-auto w-fit rounded-lg px-5 py-1.5 @[16rem]:mx-0 ">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>

                <div className="small-medium text-dark400_light500 mx-auto mt-3.5 flex items-baseline @[16rem]:mx-0">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}
                  </span>{" "}
                  Questions
                </div>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there is no tag found."
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};
export default page;
