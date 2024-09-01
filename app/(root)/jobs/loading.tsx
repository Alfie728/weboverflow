import { Skeleton } from "@/components/ui/skeleton";
import { range } from "@/lib/utils";

export default function Loading() {
  return (
    <div>
      <div className="flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      </div>

      <div className="mb-12 mt-11 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>

      <div className="flex flex-col gap-6">
        {range(5).map((item) => (
          <Skeleton key={item} className="h-72 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
