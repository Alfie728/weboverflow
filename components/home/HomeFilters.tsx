"use client";

import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import useFilter from "@/hooks/useFilter";

interface HomeFiltersProps {
  defaultFilter: string;
}

const HomeFilters = ({ defaultFilter }: HomeFiltersProps) => {
  const { filter, setFilter } = useFilter({ filterParamName: "filter" });

  const handleTypeClick = (item: string) => {
    if (filter === item) {
      setFilter("");
    } else {
      setFilter(item.toLowerCase());
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => handleTypeClick(item.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            filter === item.value.toLowerCase()
              ? "bg-primary-100 text-primary-500 dark:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-700  dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;