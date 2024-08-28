"use client";

import { formUrlQuery } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { PAGINATION_PAGE_RANGE } from "@/constants";

interface PaginationProps {
  pageNumber: number;
  isNext: boolean;
  totalPages: number;
  tabName?: "questions" | "answers";
}

const Pagination = ({
  pageNumber,
  isNext,
  totalPages,
  tabName,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (page: number) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: tabName ? `${tabName}Page` : "page",
      value: page.toString(),
    });

    router.push(newUrl);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const pageGroup = Math.ceil(pageNumber / PAGINATION_PAGE_RANGE);
    const startPage = (pageGroup - 1) * PAGINATION_PAGE_RANGE + 1;
    const endPage = Math.min(startPage + PAGINATION_PAGE_RANGE - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handleNavigation(i)}
          className={`min-h-[36px] min-w-[36px] ${
            i === pageNumber
              ? "light-border-2 border bg-primary-500 text-light-800"
              : "text-dark200_light800 light-border-2 border transition hover:bg-light-700 dark:hover:bg-dark-400"
          }`}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  const currentGroup = Math.ceil(pageNumber / PAGINATION_PAGE_RANGE);
  const lastGroupFirstPage =
    (Math.ceil(totalPages / PAGINATION_PAGE_RANGE) - 1) *
      PAGINATION_PAGE_RANGE +
    1;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation(1)}
        className="light-border-2 flex min-h-[36px] items-center justify-center gap-2 border transition hover:bg-light-700 dark:hover:bg-dark-400"
      >
        <p className="body-medium text-dark200_light800">First</p>
      </Button>
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation(pageNumber - 1)}
        className="light-border-2 flex min-h-[36px] items-center justify-center gap-2 border transition hover:bg-light-700 dark:hover:bg-dark-400"
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>
      {currentGroup > 1 && (
        <Button
          onClick={() =>
            handleNavigation((currentGroup - 1) * PAGINATION_PAGE_RANGE)
          }
          className="light-border-2 flex min-h-[36px] items-center justify-center gap-2 border transition hover:bg-light-700 dark:hover:bg-dark-400"
        >
          <p className="body-medium text-dark200_light800">...</p>
        </Button>
      )}
      {renderPageButtons()}
      {pageNumber < lastGroupFirstPage && (
        <Button
          onClick={() =>
            handleNavigation(currentGroup * PAGINATION_PAGE_RANGE + 1)
          }
          className="light-border-2 flex min-h-[36px] items-center justify-center gap-2 border transition hover:bg-light-700 dark:hover:bg-dark-400"
        >
          <p className="body-medium text-dark200_light800">...</p>
        </Button>
      )}
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation(pageNumber + 1)}
        className="light-border-2 flex min-h-[36px] items-center justify-center gap-2 border transition hover:bg-light-700 dark:hover:bg-dark-400"
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
      <Button
        disabled={pageNumber === totalPages}
        onClick={() => handleNavigation(totalPages)}
        className="light-border-2 flex min-h-[36px] items-center justify-center gap-2 border transition hover:bg-light-700 dark:hover:bg-dark-400"
      >
        <p className="body-medium text-dark200_light800">Last</p>
      </Button>
    </div>
  );
};

export default Pagination;
