# 🧩 后台管理系统前端

一个基于现代前端技术栈构建的后台管理系统模板，兼顾开发效率、代码规范与良好的用户体验，支持 PC 与移动端响应式布局。

---

## 🚀 技术栈

- **框架**：Vue 3
- **构建工具**：Vite
- **UI 组件库**：Element Plus
- **样式方案**：TailwindCSS + Less
- **语言**：TypeScript
- **状态管理**：Pinia

---

## 🛠 开发环境

- Node.js >= 22
- 包管理工具：pnpm

---

## 📦 项目特性

### ✨ 工程能力

- 基于 Vite，启动与构建速度快
- 完整 TypeScript 支持，类型安全
- 模块化目录结构，易扩展

### 🎨 UI 与样式

- 集成 Element Plus，开箱即用的后台组件
- TailwindCSS 原子化样式，提升开发效率
- Less 支持自定义主题与变量

### 📱 响应式设计

- 同时兼容 PC 与移动端
- 灵活布局方案，适配多种屏幕尺寸

### 📌 内置指令

项目内封装了常用指令，开箱即用：

- `v-clickoutside`：点击元素外部触发
- `v-lazy`：图片/组件懒加载
- `v-draggable`：元素拖拽

### 📐 代码规范

- ESLint：统一代码风格
- Prettier：自动格式化

### 🔐 Git 提交规范

- 使用 Husky 进行 Git hooks 管理
- 提交前自动执行：
  - 代码校验（lint）
  - 格式检查

---

## 📁 项目结构（示例）

```
├── src
│   ├── assets        # 静态资源
│   ├── components    # 公共组件
│   ├── directive    # 自定义指令
│   ├── layouts       # 布局组件
│   ├── router        # 路由配置
│   ├── stores        # Pinia 状态管理
│   ├── views         # 页面模块
│   └── utils         # 工具函数
├── public
├── vite.config.ts
└── package.json
```

---

## 📦 安装依赖

```bash
pnpm install
```

---

## 💻 本地开发

```bash
pnpm dev
```

---

## 🏗 构建项目

```bash
pnpm build
```

---

## 🔍 代码检查

```bash
pnpm lint
```

---

## 📌 Git 提交流程

项目已集成 Husky，在提交代码时会自动执行校验：

---

## 🧠 适用场景

- 后台管理系统
- 中后台业务平台
- 数据可视化管理面板
- 企业内部工具系统

---

## 📄 License

MIT License

---

## 🤝 贡献

欢迎提交 Issue 或 PR 一起完善项目 🚀
