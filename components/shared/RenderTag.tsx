import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
  otherClasses?: string;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link
      href={`/tags/${_id}`}
      className={`flex items-baseline justify-between gap-2 rounded-md`}
    >
      <Badge className="subtle-medium rounded-md border-none bg-light-700 px-2 py-1 uppercase text-dark-500 dark:bg-slate-500 dark:text-slate-200">
        {name}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
};
export default RenderTag;
