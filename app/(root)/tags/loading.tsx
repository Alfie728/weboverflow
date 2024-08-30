import { Skeleton } from "@/components/ui/skeleton";
import { range } from "@/lib/utils";

export default function Loading() {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" /> {/* Search input */}
        <Skeleton className="h-14 min-w-[170px]" /> {/* Filter dropdown */}
      </div>

      <section className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-4 ">
        {range(12).map((item) => (
          <Skeleton key={item} className="h-[120px] rounded-2xl" />
        ))}
      </section>

      <div className="mt-10 flex justify-center">
        <Skeleton className="h-10 w-60" /> {/* Pagination */}
      </div>
    </>
  );
}
