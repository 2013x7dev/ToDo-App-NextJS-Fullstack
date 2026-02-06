"use client";
import { set } from "lodash";
import { createContext, useContext, useState } from "react";

interface AuthProviderProps {
  isAuthenticated: boolean;
  user: { name: string } | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

// 自定义 hook 用于在组件中访问 AuthContext
export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
}

const AuthContext = createContext<AuthProviderProps>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  const login = () => {
    setIsAuthenticated(true);
    setUser({ name: "John Doe" });
  };
  return (
    <>
      <AuthContext.Provider
        value={{
          isAuthenticated: false,
          user: null,
          isLoading: true,
          login: () => {},
          logout: () => {},
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
