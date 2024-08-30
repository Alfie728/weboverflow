import { TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface ProfileTabsTriggerProps {
  value: string;
  label: string;
  userId: string;
  questionsPage: number;
  answersPage: number;
  isActive: boolean;
}

const ProfileTabsTrigger = ({
  value,
  label,
  userId,
  questionsPage,
  answersPage,
  isActive,
}: ProfileTabsTriggerProps) => {
  return (
    <Link
      href={`/profile/${userId}?tab=${value}&questionsPage=${questionsPage}&answersPage=${answersPage}`}
      scroll={false}
    >
      <TabsTrigger
        value={value}
        className={`tab inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
          isActive
            ? "bg-white text-slate-950 shadow dark:bg-slate-950 dark:text-slate-50"
            : ""
        }`}
      >
        {label}
      </TabsTrigger>
    </Link>
  );
};

export default ProfileTabsTrigger;
