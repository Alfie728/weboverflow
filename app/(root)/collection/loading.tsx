import { Skeleton } from "@/components/ui/skeleton";
import CollectionPageWrapper from "./CollectionPageWrapper";
import { range } from "@/lib/utils";

const Loading = () => {
  return (
    <CollectionPageWrapper>
      <div className="mb-12 mt-11 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>

      <div className="flex flex-col gap-6">
        {range(10).map((item) => (
          <Skeleton key={item} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </CollectionPageWrapper>
  );
};
export default Loading;
