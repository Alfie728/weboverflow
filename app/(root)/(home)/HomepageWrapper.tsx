import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const HomepageWrapper = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 shadow-sm transition hover:scale-105 hover:shadow-md">
            Ask a Question
          </Button>
        </Link>
      </div>
      {children}
    </section>
  );
};
export default HomepageWrapper;
