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
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.theme || "system"
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      if (selectedTheme === "system") {
        setMode(mediaQuery.matches ? "dark" : "light");
      }
    };

    handleSystemThemeChange();
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [selectedTheme, setMode]);

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    if (theme === "system") {
      localStorage.removeItem("theme");
      setMode(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    } else {
      localStorage.theme = theme;
      setMode(theme);
    }
  };

  const getThemeIcon = (theme: string) => {
    const iconMap = {
      light: { src: "/assets/icons/sun.svg", size: 24 },
      dark: { src: "/assets/icons/moon.svg", size: 20 },
      system: { src: "/assets/icons/computer.svg", size: 28 }, // Slightly larger
    };
    return iconMap[theme as keyof typeof iconMap] || iconMap.system;
  };

  return (
    <Menubar className="relative border-transparent bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:cursor-pointer focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {(() => {
            const { src, size } = getThemeIcon(selectedTheme);
            return (
              <div style={{ width: `${size}px`, height: `${size}px` }}>
                <Image
                  src={src}
                  alt={selectedTheme}
                  width={size}
                  height={size}
                  className="active-theme"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            );
          })()}
        </MenubarTrigger>
        <MenubarContent className="absolute -right-12 mt-3 min-w-[120px] rounded border bg-light-900 p-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map(({ value, icon, label }) => (
            <MenubarItem
              key={value}
              onClick={() => handleThemeChange(value)}
              className="flex items-center gap-4 px-2.5 py-2 focus:bg-light-700 dark:focus:bg-dark-400"
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
                  selectedTheme === value
                    ? "text-primary-500"
                    : "text-dark100_light900"
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
