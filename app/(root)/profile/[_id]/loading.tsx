import { Skeleton } from "@/components/ui/skeleton";

const Loading = async () => {

  return (
    <section className="flex flex-col gap-8 max-sm:gap-10">
      <div className="flex justify-between max-sm:flex-col max-sm:items-center">
        <div className="flex flex-col items-start gap-4 max-sm:items-center lg:flex-row">
          <Skeleton className="size-36 rounded-full" />
          <div className="mt-3 max-sm:flex max-sm:flex-col max-sm:items-center">
            <Skeleton className="mb-2 h-7 w-40" />
            <Skeleton className="mb-5 h-4 w-28" />
            <div className="flex flex-wrap gap-5">
              <Skeleton className="h-9 w-36" />
              <Skeleton className="h-9 w-36" />
            </div>
          </div>
        </div>
        <Skeleton className="h-12 w-44 max-sm:mt-5" />
      </div>

      <div className="flex gap-10 max-sm:flex-wrap">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-28 w-full max-w-[200px]" />
        ))}
      </div>

      <div className="mt-10 flex gap-10">
        <div className="flex-1">
          <Skeleton className="mb-6 h-10 w-full max-w-[300px]" />
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="mb-6 h-48 w-full" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loading;
