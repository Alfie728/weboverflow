import { Skeleton } from "@/components/ui/skeleton";
import { range } from "@/lib/utils";

const Loading = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mb-12 mt-11 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-[170px]" />
      </div>

      <div className="mt-12 grid w-full grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4">
        {range(12).map((item) => (
          <Skeleton key={item} className="h-60 w-40 rounded-2xl sm:w-[188px]" />
        ))}
      </div>
    </>
  );
};
export default Loading;
