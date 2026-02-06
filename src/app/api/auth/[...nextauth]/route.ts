import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const authOptions: NextAuthOptions = {
  // 配置会话策略

  session: {
    // 2.1 会话策略：'jwt' | 'database'
    // strategy: 'jwt', // 推荐：JWT 无需数据库存储会话

    // 2.2 会话最大时长（秒）
    // maxAge: 30 * 24 * 60 * 60, // 30天

    // 2.3 更新间隔（秒）- 多久更新一次 token
    // updateAge: 24 * 60 * 60, // 24小时

    // 2.4 生成会话令牌的函数（高级用法）
    // generateSessionToken: () => {
    //   return randomUUID();
    // }
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30天
  },

  // cookies: {
  //   sessionToken: {
  //     name: `next-auth.session-token`,
  //     options: {
  //       // httpOnly: true,
  //       // sameSite: "lax",
  //       // path: "/",
  //       // secure: process.env.NODE_ENV === "production",
  //       // domain: ".example.com", // 跨子域共享
  //       // maxAge: 30 * 24 * 60 * 60, // 与 session.maxAge 一致
  //     },
  //   },
  // },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your-username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials, req) {
        return { id: "123", name: "小柒" };
        // const res = await fetch("/api/auth/login", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });

        // console.log("登录结果", res);

        // const user = await res.json();

        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }

        // return null;
      },
    }),
  ],
  callbacks: {
    // 🔑 关键：JWT 回调必须正确设置 token
    async jwt({ token, user, account }) {
      console.log("=== JWT Callback ===");

      // 初次登录时，user 对象可用
      if (user) {
        token.name = user.name;
        // 复制所有需要的字段
      }
      console.log("JWT Token:", token);
      return token;
    },
    // 🔑 关键：Session 回调必须正确设置 session
    async session({ session, token }) {
      if (token) {
        // 修改后的session对服务端可见
        session!.user!.name = token!.name;
      }
      console.log("=== Session Callback ===", session);
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
