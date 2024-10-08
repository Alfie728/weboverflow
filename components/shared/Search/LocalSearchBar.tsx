"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import useSearch from "@/hooks/useSearch";

interface CustomInputProps {
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchBar = ({
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const { search, setSearch } = useSearch({ searchParamName: "q" });

  return (
    <div
      className={`flex min-h-[56px] grow items-center gap-4 rounded-[10px] bg-light-800 px-4 dark:bg-dark-200 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light800 border-none bg-light-800 shadow-none outline-none dark:bg-dark-200"
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
