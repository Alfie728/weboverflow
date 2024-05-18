import Image from "next/image";
import Link from "next/link";
import RenderTag from "../RenderTag";

const RightSidebar = () => {
  const hotQuestions = [
    {
      _id: 1,
      title:
        "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    },
    {
      _id: 2,
      title: "Is it only me or the font is bolder than necessary?",
    },
    {
      _id: 3,
      title: "Redux Toolkit Not Updating State as Expected",
    },
    {
      _id: 3,
      title: "Can I get the course for free?",
    },
    {
      _id: 5,
      title: "Async/Await Function Not Handling Errors Properly",
    },
  ];

  const popularTags = [
    {
      _id: 1,
      name: "javascript",
      totalQuestions: 55,
    },
    {
      _id: 1,
      name: "react",
      totalQuestions: 25,
    },
    {
      _id: 1,
      name: "next",
      totalQuestions: 2,
    },
    {
      _id: 1,
      name: "vue",
      totalQuestions: 8,
    },
    {
      _id: 1,
      name: "redux",
      totalQuestions: 15,
    },
  ];
  return (
    <section className="custom-scrollbar  background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col justify-between overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              href={`/questions/${_id}`}
              key={_id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <span className="body-medium text-dark500_light700">{title}</span>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, name, totalQuestions }) => (
            <RenderTag
              key={_id}
              _id={_id}
              name={name}
              totalQuestions={totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default RightSidebar;
