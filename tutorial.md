# Flowlist (Next.js 全栈待办应用) 学习文档
## 一、项目概述
### 1.1 项目简介
Flowlist 是一款基于 Next.js 构建的全栈轻量级待办事项应用，深度整合了前端与后端能力，实现了完整的用户认证、深色/浅色模式切换、数据持久化存储等核心功能。该项目不仅展示了 Next.js 作为全栈框架的强大能力，也为学习者提供了从基础搭建到高级特性落地的完整实践案例。

### 1.2 核心技术栈
| 技术/工具       | 用途                     |
|----------------|--------------------------|
| Next.js        | 全栈框架（前端+后端API） |
| MongoDB        | 主要数据存储数据库       |
| SQLite         | 辅助持久化存储           |
| Socket.io/WebSockets | 实时待办事项更新     |
| React          | 前端UI构建               |
| TypeScript     | 类型安全开发             |
| Docker/Kubernetes | 容器化与编排        |
| Jenkins        | CI/CD自动化部署          |
| Vercel         | 生产环境部署             |
| PWA            | 离线访问能力             |
| Swagger/OpenAPI | API文档生成             |

### 1.3 核心功能
- 完整的用户认证体系（注册、登录、忘记密码）
- 深色/浅色模式切换
- 基于用户的待办事项分类管理
- 待办事项CRUD（创建、读取、更新、删除）+ 完成状态标记
- 实时待办更新（WebSocket/Socket.io）
- 响应式UI设计（适配多设备）
- 离线访问能力（PWA）
- 多视图展示（计划视图、洞察视图、专注模式）
- 数据持久化（MongoDB/SQLite/内存存储）

## 二、环境搭建与运行
### 2.1 前置条件
- Node.js (v16+ 推荐)
- npm/yarn (包管理工具)
- Git (版本控制)
- MongoDB (本地/远程实例，可选)
- Docker (可选，容器化运行)

### 2.2 项目拉取与安装
```bash
# 1. 克隆仓库
git clone <仓库地址>
cd ToDo-App-NextJS-Fullstack

# 2. 安装依赖
npm install
# 或使用yarn
yarn install
```

### 2.3 环境变量配置
在项目根目录创建 `.env.local` 文件，配置以下核心变量（根据实际需求调整）：
```env
# 数据库配置
MONGODB_URI=mongodb://localhost:27017/flowlist
SQLITE_DB_PATH=./data/db.sqlite

# 认证相关
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Socket.io 配置
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000

# 其他
NODE_ENV=development
```

### 2.4 运行与构建
```bash
# 开发环境运行
npm run dev
# 访问地址：http://localhost:3000

# 生产环境构建
npm run build

# 生产环境启动
npm run start

# 容器化运行（可选）
docker-compose up -d
```

## 三、项目结构解析
### 3.1 核心目录/文件说明
| 路径/文件               | 作用说明                                                                 |
|-------------------------|--------------------------------------------------------------------------|
| `src/`                  | 核心源码目录（前端组件、后端API、工具函数等）                            |
| `public/`               | 静态资源目录（图标、manifest、图片等，PWA相关资源也在此）                |
| `images/`               | 文档截图/UI预览图（非项目运行依赖）                                      |
| `kubernetes/`           | Kubernetes编排配置文件（容器化部署）                                     |
| `nginx/`                | Nginx反向代理配置（生产环境部署）                                        |
| `.github/`              | GitHub Actions CI/CD配置（可选）                                         |
| `openapi.yaml`          | OpenAPI规范文件（Swagger API文档生成依据）                               |
| `next.config.mjs`       | Next.js 配置文件（自定义构建、路由、PWA等）                              |
| `tsconfig.json`         | TypeScript 配置                                                          |
| `Dockerfile/docker-compose.yml` | 容器化配置文件                                                     |
| `Jenkinsfile`           | Jenkins CI/CD流水线配置                                                  |

### 3.2 关键模块拆分
#### （1）前端模块（src/app/ 或 src/pages/）
- 路由：基于Next.js App Router/Pages Router实现，包含登录、注册、待办列表、洞察视图等页面
- 组件：通用UI组件（按钮、表单、模态框）、业务组件（待办项、分类面板、视图切换）
- 状态管理：内置React State/Context（或第三方库）管理用户状态、待办数据、主题模式
- PWA：通过`public/manifest.json`和Next.js配置实现离线访问、桌面安装能力

#### （2）后端模块（src/api/ 或 src/pages/api/）
- 认证API：`/api/auth/[...nextauth]`（NextAuth.js实现登录/注册/会话管理）
- 待办项API：`/api/todos/`（CRUD接口，对接MongoDB/SQLite）
- WebSocket：`/api/socket/`（Socket.io服务端，实现实时更新）
- 健康检查/测试API：辅助验证服务可用性

#### （3）数据层
- MongoDB：用户数据、待办事项核心存储
- SQLite：轻量级持久化存储（备用/本地开发）
- 内存存储：临时数据（开发环境）
- 本地存储：前端localStorage辅助持久化（如主题偏好）

## 四、核心功能学习与实践
### 4.1 用户认证（NextAuth.js）
#### 核心知识点
- NextAuth.js 集成：支持邮箱/密码、OAuth等认证方式
- 会话管理：JWT/数据库存储会话
- 权限控制：基于会话的接口/页面访问限制

#### 实践要点
```tsx
// 示例：页面级权限校验
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]";

export default async function TodoPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login"); // 未登录重定向到登录页
  }
  // 已登录渲染待办列表
  return <TodoList userId={session.user.id} />;
}
```

### 4.2 待办事项CRUD
#### 核心知识点
- Next.js API路由编写（后端接口）
- 数据库增删改查（MongoDB/SQLite）
- 前端与后端接口交互（Axios/SWR/React Query）

#### 实践要点（API示例）
```ts
// src/pages/api/todos/[id].ts (更新待办)
import { NextApiRequest, NextApiResponse } from "next";
import { updateTodo } from "@/lib/db/todos";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { title, completed, category } = req.body;

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const updatedTodo = await updateTodo(id as string, {
      title,
      completed,
      category,
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
}
```

### 4.3 实时更新（Socket.io）
#### 核心知识点
- Socket.io 服务端与客户端集成
- 待办事项变更的实时推送（创建/更新/删除）
- 多客户端同步数据

#### 实践要点
```ts
// 服务端（src/api/socket/route.ts）
import { Server } from "socket.io";

export const GET = async (req: Request) => {
  const io = new Server(3001, {
    cors: { origin: "http://localhost:3000" },
  });

  io.on("connection", (socket) => {
    // 监听待办更新事件
    socket.on("todo:update", (todo) => {
      // 广播给所有客户端
      io.emit("todo:updated", todo);
    });

    // 断开连接
    socket.on("disconnect", () => {});
  });

  return new Response("Socket server running", { status: 200 });
};

// 客户端（组件内）
import { useEffect } from "react";
import io from "socket.io-client";

const TodoRealTime = () => {
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
    // 监听实时更新
    socket.on("todo:updated", (updatedTodo) => {
      // 更新本地待办列表
      console.log("Todo updated:", updatedTodo);
    });

    return () => socket.disconnect();
  }, []);

  return null;
};
```

### 4.4 主题切换（深色/浅色模式）
#### 核心知识点
- React Context 管理主题状态
- localStorage 持久化主题偏好
- CSS变量/Styled Components实现样式切换

#### 实践要点
```tsx
// 主题Context示例
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  // 初始化从本地存储读取
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 组件内使用
export const useTheme = () => useContext(ThemeContext);
```

### 4.5 PWA 离线能力
#### 核心知识点
- Next.js PWA插件配置
- `manifest.json` 配置应用元信息
- Service Worker 缓存静态资源/API请求

#### 实践要点
在 `next.config.mjs` 中配置PWA：
```js
import withPWA from "next-pwa";

const nextConfig = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  // 其他Next.js配置
});

export default nextConfig;
```

## 五、测试与部署
### 5.1 测试
#### （1）测试类型
- API测试：验证待办项CRUD、认证接口的正确性
- 单元测试：工具函数、组件逻辑测试
- 端到端测试（可选）：验证完整用户流程（如登录→创建待办→完成待办）

#### （2）运行测试
```bash
# 执行测试脚本（需项目配置test命令）
npm run test
# 或
npm run test:api # 仅测试API
npm run test:ui # 仅测试UI组件
```

### 5.2 部署
#### （1）Vercel 部署（推荐）
1. 关联GitHub仓库到Vercel
2. 配置环境变量（与`.env.local`一致）
3. 触发自动构建部署，访问分配的Vercel域名

#### （2）Docker 部署
```bash
# 构建镜像
docker build -t flowlist:latest .

# 运行容器
docker run -p 3000:3000 --env-file .env.local flowlist:latest

# 或使用docker-compose
docker-compose up -d
```

#### （3）Jenkins CI/CD 部署
通过 `Jenkinsfile` 配置流水线，实现：
- 代码拉取 → 依赖安装 → 测试 → 构建 → 部署（Vercel/Docker/K8s）

## 六、扩展与优化方向
### 6.1 功能扩展
- 添加待办事项优先级/截止日期
- 实现待办事项分享功能
- 集成第三方日历（Google Calendar/Outlook）
- 增加数据导出/导入功能
- 多语言支持（i18n）

### 6.2 性能优化
- 数据库索引优化（MongoDB/SQLite）
- 前端组件懒加载/代码分割
- API请求缓存（SWR/React Query）
- 实时更新优化（减少不必要的Socket推送）

### 6.3 安全优化
- 接口权限精细化控制
- 输入验证/防XSS/CSRF
- 密码加密存储（bcrypt）
- 限流防刷（API接口）

## 七、常见问题与解决
| 问题现象                  | 可能原因                  | 解决方法                                  |
|---------------------------|---------------------------|-------------------------------------------|
| 开发环境无法连接MongoDB   | 本地MongoDB未启动/地址错误 | 启动MongoDB，检查`MONGODB_URI`配置        |
| 实时更新不生效            | Socket.io服务未启动/跨域  | 检查Socket服务配置，配置CORS允许前端域名  |
| PWA无法安装               | manifest配置错误/HTTPS问题 | 检查`manifest.json`，生产环境使用HTTPS    |
| 部署后认证失效            | NEXTAUTH_SECRET/URL错误   | 确认环境变量与部署地址一致                |

## 八、参考资源
1. Next.js 官方文档：https://nextjs.org/docs
2. NextAuth.js 文档：https://next-auth.js.org/
3. Socket.io 文档：https://socket.io/docs/
4. MongoDB 文档：https://www.mongodb.com/docs/
5. PWA 开发指南：https://web.dev/progressive-web-apps/
6. OpenAPI/Swagger 文档：https://swagger.io/specification/