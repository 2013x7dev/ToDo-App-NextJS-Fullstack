import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log(session, status);
  const router = useRouter();
  if (status === "unauthenticated") {
    return router.push("/auth/login");
  }
  if (status === "loading") {
    return <div>Loading....</div>;
  }
  return session ? <>{children}</> : null;
}
