"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function DarkModeToggle() {
  const { setTheme,theme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme == "light" ? "dark" : "light")}
      className="relative h-6 w-12 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500"
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`absolute left-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white transition-transform duration-300 ${
          theme == "dark" ? "translate-x-6" : ""
        }`}
      >
        {theme == "light" ? (
          <Moon className="h-3 w-3 text-gray-800" />
        ) : (
          <Sun className="h-3 w-3 text-yellow-500" />
        )}
      </span>
    </button>
  );
}
