"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";

import GlobalResult from "./GlobalResult";
import useDebounce from "@/hooks/useDebounce";
import useModal from "@/hooks/useModal";
import { useState, LegacyRef } from "react";

const GlobalSearch = () => {
  const { isOpen, openModal, closeModal, toggleModal, modalRef, triggerRef } =
    useModal();
  const [search, setSearch] = useState("");

  useDebounce(search, 500);

  return (
    <div
      className="relative ml-6 w-full max-w-[500px] max-lg:hidden"
      ref={modalRef}
    >
      <div className="relative flex min-h-[56px] grow items-center gap-1 rounded-xl bg-light-800 px-4 dark:bg-dark-300">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={toggleModal}
        />
        <Input
          ref={triggerRef as LegacyRef<HTMLInputElement>}
          type="text"
          placeholder="Search globally"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen && e.target.value !== "") openModal();
            if (e.target.value === "" && isOpen) closeModal();
          }}
          onFocus={() => !isOpen && openModal()}
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-light-800 shadow-none outline-none dark:bg-dark-300"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
