import { BadgeCounts } from "@/types";
import Image from "next/image";

interface Props {
  totalQuestions: number;
  totalAnswers: number;
  badges: BadgeCounts;
  reputation: number;
}

interface StatsCardProps {
  imgURL: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgURL, value, title }: StatsCardProps) => {
  return (
    <article className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 transition @container hover:shadow-lg dark:shadow-light-100 dark:hover:shadow-light-200">
      <Image src={imgURL} alt={title} width={40} height={50} />
      <div className="flex w-full flex-col items-center justify-center @[10rem]:flex-row @[10rem]:gap-4">
        <p className="paragraph-semibold text-primary-500">{value}</p>
        <p className="body-medium text-dark200_light900">{title}</p>
      </div>
    </article>
  );
};

const Stats = ({ totalQuestions, totalAnswers, badges, reputation }: Props) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">
        Reputation - <span className="text-primary-500">{reputation}</span>
      </h4>
      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-4">
        <article className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-5 rounded-md border p-6 pb-[1.125rem] pt-7 @container  hover:shadow-lg dark:shadow-light-100 dark:hover:shadow-light-200">
          <div className="flex w-full flex-col items-center justify-center @[10rem]:flex-row @[10rem]:gap-4">
            <p className="paragraph-semibold text-primary-500">
              {totalQuestions}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div className="flex w-full flex-col items-center justify-center @[10rem]:flex-row @[10rem]:gap-4">
            <p className="paragraph-semibold text-primary-500">
              {totalAnswers}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </article>

        <StatsCard
          imgURL="/assets/icons/gold-medal.svg"
          value={badges.GOLD}
          title="Gold Badges"
        />
        <StatsCard
          imgURL="/assets/icons/silver-medal.svg"
          value={badges.SILVER}
          title="Sliver Badges"
        />
        <StatsCard
          imgURL="/assets/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};
export default Stats;
