"use client";

import { useState, useEffect } from "react";
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
  const { setMode } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState("system");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setSelectedTheme(storedTheme);
      }
    }
  }, []);

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    if (typeof window !== "undefined") {
      if (theme === "system") {
        localStorage.removeItem("theme");
        setMode(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      } else {
        localStorage.setItem("theme", theme);
        setMode(theme);
      }
    }
  };

  const currentTheme = themes.find(theme => theme.value === selectedTheme) || themes[2]; // Default to system

  return (
    <Menubar className="relative border-transparent bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:cursor-pointer focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          <div style={{ width: `${currentTheme.size}px`, height: `${currentTheme.size}px` }}>
            <Image
              src={currentTheme.icon}
              alt={currentTheme.label}
              width={currentTheme.size}
              height={currentTheme.size}
              className="active-theme"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </MenubarTrigger>
        <MenubarContent className="absolute -right-12 mt-3 min-w-[120px] rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map(({ value, icon, label, size }) => (
            <MenubarItem
              key={value}
              onClick={() => handleThemeChange(value)}
              className="flex cursor-pointer items-center gap-4 px-2.5 py-2  focus:bg-light-700 dark:focus:bg-dark-400"
            >
              <Image
                src={icon}
                alt={label}
                width={16}
                height={16}
                className={selectedTheme === value ? "active-theme" : ""}
              />
              <p
                className={`body-semibold ${
                  selectedTheme === value ? "text-primary-500" : "text-dark100_light900"
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
