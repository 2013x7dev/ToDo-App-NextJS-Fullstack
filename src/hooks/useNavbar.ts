import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NavbarReturn {
  user: { id: number; username: string } | null;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
}

export default function useNavbar() {
  const [user, setUser] = useState<{ id: number; username: string } | null>(
    null
  );

  const router = useRouter();
  const onLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    router.push("/auth/login");
  };

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return { user, onLogout } as NavbarReturn;
}
