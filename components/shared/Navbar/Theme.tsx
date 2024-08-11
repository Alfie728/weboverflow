"use client";

import { useTheme } from "@/context/ThemeProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants";

const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <Menubar className="relative border border-transparent bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:cursor-pointer focus:bg-light-900 data-[state=open]:bg-light-900 dark:pr-4 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              width={30}
              height={30}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              width={25}
              height={25}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute -right-12 mt-3 min-w-[120px] rounded border  bg-light-900  py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map(({ value, icon, label }) => (
            <MenubarItem
              key={value}
              onClick={() => {
                setMode(value);
                if (value !== "system") {
                  localStorage.theme = value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
              className="flex items-center gap-4 px-2.5 py-2 focus:bg-light-700  dark:focus:bg-dark-400"
            >
              <Image
                src={icon}
                alt={label}
                width={16}
                height={16}
                className={`${mode === value && "active-theme"}`}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === value ? "text-primary-500" : "text-dark100_light900"
                }`}
              >
                {label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
