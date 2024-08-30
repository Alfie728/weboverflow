import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <Skeleton className="h-10 w-4/5" /> {/* Question title */}
        <div className="flex gap-4">
          <Skeleton className="h-6 w-20" /> {/* Tag */}
          <Skeleton className="h-6 w-20" /> {/* Tag */}
        </div>
        <Skeleton className="h-80 w-full" /> {/* Question content */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-10 rounded-full" /> {/* User avatar */}
            <Skeleton className="h-6 w-32" /> {/* Username */}
          </div>
          <Skeleton className="h-6 w-20" /> {/* Date */}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <Skeleton className="h-8 w-40" /> {/* Answers count */}
          <Skeleton className="h-8 w-32" /> {/* Sort by */}
        </div>

        {/* Answer items */}
        {[1, 2].map((item) => (
          <div key={item} className="flex flex-col gap-4 pb-6">
            <Skeleton className="h-32 w-full" /> {/* Answer content */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="size-10 rounded-full" />{" "}
                {/* User avatar */}
                <Skeleton className="h-6 w-32" /> {/* Username */}
              </div>
              <Skeleton className="h-6 w-20" /> {/* Date */}
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="h-40 w-full" /> {/* Answer form */}
    </section>
  );
}
