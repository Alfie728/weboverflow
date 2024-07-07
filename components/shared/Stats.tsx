import Image from "next/image";

interface Props {
  totalQuestions: number;
  totalAnswers: number;
}

interface StatsCardProps {
  imgURL: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgURL, value, title }: StatsCardProps) => {
  return (
    <article className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 @container dark:shadow-dark-200">
      <Image src={imgURL} alt={title} width={40} height={50} />
      <div className="grid place-items-center @[10rem]:flex @[10rem]:gap-4">
        <p className="paragraph-semibold text-dark200_light900">{value}</p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </article>
  );
};

const Stats = ({ totalQuestions, totalAnswers }: Props) => {
  return (
    <div className="mt-10">
      <h4 className="text-dark400_light900 h3-semibold">Stats</h4>
      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-4">
        <article className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-5 rounded-md border p-4 shadow-light-300 @container dark:shadow-dark-200">
          <div className="grid place-items-center @[10rem]:flex @[10rem]:gap-4">
            <p className="paragraph-semibold text-dark200_light900">
              {totalQuestions}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div className="grid place-items-center @[10rem]:flex @[10rem]:gap-4">
            <p className="paragraph-semibold text-dark200_light900">
              {totalAnswers}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </article>

        <StatsCard
          imgURL="/assets/icons/gold-medal.svg"
          value={0}
          title="Gold Badges"
        />
        <StatsCard
          imgURL="/assets/icons/silver-medal.svg"
          value={0}
          title="Gold Badges"
        />
        <StatsCard
          imgURL="/assets/icons/bronze-medal.svg"
          value={0}
          title="Gold Badges"
        />
      </div>
    </div>
  );
};
export default Stats;
