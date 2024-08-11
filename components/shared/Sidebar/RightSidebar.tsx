import Image from "next/image";
import Link from "next/link";
import RenderTag from "../RenderTag";
import { getHotQuestion } from "@/lib/actions/question.action";
import { getTopPopularTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestion();

  const popularTags = await getTopPopularTags();
  return (
    <section className="custom-scrollbar  background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div className="mt-10">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-4 flex w-full flex-col ">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              href={`/question/${_id}`}
              key={_id}
              className="flex cursor-pointer items-center justify-between gap-7 rounded-lg p-4 hover:bg-light-800 dark:hover:bg-dark-400"
            >
              <span className="body-medium text-dark500_light700">{title}</span>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="dark:invert"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-12">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col">
          {popularTags.map((tag) => (
            <div
              key={tag._id}
              className="rounded-lg border border-transparent p-2 pr-6 transition hover:bg-light-800 dark:hover:bg-dark-400
            "
            >
              <RenderTag
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.numberOfQuestions}
                showCount
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default RightSidebar;
