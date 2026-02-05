"use client";

import { getAppTheme } from "@/app/theme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import {
  PropsWithChildren,
  use,
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
  console.log("initialDarkMode", initialDarkMode);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialDarkMode);
  const theme = useMemo(() => getAppTheme(isDarkMode), [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.cookie = `darkMode=${next}; path=/; max-age=31536000`;
    localStorage.setItem("darkMode", JSON.stringify(next));
  };

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
