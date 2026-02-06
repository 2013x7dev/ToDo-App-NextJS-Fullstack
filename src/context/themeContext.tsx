"use client";

import { getAppTheme } from "@/app/theme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createContext } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  theme: ReturnType<typeof getAppTheme>;
  toggleDarkMode?: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  theme: getAppTheme(false),
});

export function ThemeProvider({
  children,
  initialDarkMode,
}: PropsWithChildren<{ initialDarkMode: boolean }>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialDarkMode);
  const theme = useMemo(() => getAppTheme(isDarkMode), [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      console.log("isDarkMode pre", prev);
      const next = !prev;
      document.cookie = `darkMode=${next}; path=/; max-age=31536000`;
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, theme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
