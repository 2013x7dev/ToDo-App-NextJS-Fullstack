"use client";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/themeContext";

interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
  initialDarkMode: boolean;
}

export const Providers = ({
  children,
  session,
  initialDarkMode,
}: ProvidersProps) => {
  return (
    <SessionProvider session={session}>
      {/* 确保只在根布局中提供 ThemeProvider, 单一实例 */}
      <ThemeProvider initialDarkMode={initialDarkMode}>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};
