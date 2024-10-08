"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
  placeholder?: string;
  filterKey?: string;
  noneText?: string;
}

const Filter = ({
  filters,
  otherClasses,
  containerClasses,
  placeholder,
  filterKey,
  noneText,
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get("filter");

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: filterKey || "filter",
      value,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramFilter || undefined}
      >
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 w-[180px] border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeholder || "Select a Filter"} />
          </div>
        </SelectTrigger>
        <SelectContent className="background-light800_dark300 text-dark500_light700">
          <SelectGroup className="background-light800_dark300">
            <SelectItem
              value="none"
              className="text-dark500_light700 focus:bg-light-700 dark:focus:bg-dark-400"
            >
              {noneText || "No Filter"}
            </SelectItem>
            {filters.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="text-dark500_light700 cursor-pointer focus:bg-light-700 dark:focus:bg-dark-400"
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default Filter;
