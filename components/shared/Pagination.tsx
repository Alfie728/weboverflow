"use client";

import { formUrlQuery } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  pageNumber: number;
  isNext: boolean;
  totalPages: number;
}

const Pagination = ({ pageNumber, isNext, totalPages }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (page: number) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: page.toString(),
    });

    router.push(newUrl);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = Math.min(5, totalPages);
    const startPage = Math.max(
      1,
      Math.min(pageNumber - 2, totalPages - maxButtons + 1)
    );
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handleNavigation(i)}
          className={`min-h-[36px] min-w-[36px] ${
            i === pageNumber
              ? "light-border-2 border bg-primary-500 text-light-800"
              : "text-dark200_light800  light-border-2 border transition hover:bg-light-700 dark:hover:bg-dark-400"
          }`}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation(pageNumber - 1)}
        className="light-border-2 flex min-h-[36px] items-center justify-center gap-2 border transition hover:bg-light-700 dark:hover:bg-dark-400"
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>
      {renderPageButtons()}
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation(pageNumber + 1)}
        className="light-border-2 flex min-h-[36px] items-center justify-center gap-2 border transition hover:bg-light-700 dark:hover:bg-dark-400"
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
