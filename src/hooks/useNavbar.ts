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
    router.push("/auth/login");
  };

  useEffect(() => {}, []);

  return { user, onLogout } as NavbarReturn;
}
