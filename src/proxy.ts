import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default async function proxy(req: NextRequest) {
  console.log("proxy>>>>>>>>>>>>>>", req.url);
  const { pathname } = req.nextUrl;
  const token = await getToken({ req });
  const excludePaths = [
    "/auth/login",
    "/auth/register",
    "/api/auth/signin",
    "/api/auth/session",
    "/api/auth/providers",
    "/api/auth//csrf",
  ];
  if (!token) {
    // 如果路径在排除列表中，直接放行
    if (excludePaths.includes(pathname)) {
      return NextResponse.next();
    }
    // 如果是 API 请求，返回 401 错误
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    // 其他情况，重定向到登录页
    return NextResponse.redirect(new URL("/auth/login", req.url));
  } else {
    // 如果是登录页，重定向到首页
    if (pathname.startsWith("/auth/login")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
