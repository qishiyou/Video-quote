# 视频制作报价单系统

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.0.0-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
</div>

<div align="center">
  <h3>🎬 专业的视频制作报价单生成系统</h3>
  <p>基于 React.js + Next.js 14 构建的现代化视频制作报价平台</p>
</div>

---

## 📋 项目简介

视频制作报价单系统是一个专业的在线报价平台，为视频制作公司和客户提供透明、准确的报价服务。系统采用现代化的技术栈，提供直观的用户界面和强大的功能特性。

## ✨ 核心功能

### 🎯 主要特性
- **📝 智能报价表单**：动态表单系统，根据选择自动显示相关配置选项
- **💰 实时价格计算**：基于多维度参数的智能价格计算引擎
- **📄 PDF报价单生成**：一键生成专业的PDF报价文档
- **🌓 主题切换**：支持明暗主题切换，提供舒适的视觉体验
- **📱 响应式设计**：完美适配桌面端、平板和移动设备
- **🔗 社交媒体集成**：微信二维码展示和GitHub仓库链接

### 🎬 视频制作配置
- **地区选择**：支持北京、上海、广州等多个城市
- **视频类型**：宣传片、广告片、微电影、二维动画、三维动画
- **拍摄配置**：灵活的拍摄天数和影片时长设置
- **制作规格**：创意策划、摄制团队、拍摄设备、场景选择
- **人员配置**：专业演员选择和配置
- **后期制作**：配音配乐、剪辑特效等后期服务

### 🌐 多页面导航
- **🏠 首页**：主要的报价表单和计算功能
- **📞 联系我们**：联系方式展示，包含微信和GitHub集成
- **❓ 帮助中心**：详细的使用指南和常见问题解答
- **📋 其他页面**：关于我们、案例展示、服务介绍等

## 🛠️ 技术栈

### 前端技术
- **⚛️ React 18**：现代化的前端框架
- **🔥 Next.js 14**：全栈React框架，支持SSR和App Router
- **📘 TypeScript 5**：类型安全的JavaScript超集
- **🎨 Tailwind CSS 3.3**：实用优先的CSS框架
- **🎭 Framer Motion**：流畅的动画和交互效果

### 功能库
- **📄 jsPDF**：PDF文档生成
- **📸 html2canvas**：HTML转图片，用于PDF生成
- **🎯 Lucide React**：现代化的图标库
- **📱 QRCode**：二维码生成

### 开发工具
- **📦 npm/pnpm**：包管理器
- **🔍 ESLint**：代码质量检查
- **🎯 PostCSS**：CSS后处理器
- **⚡ Autoprefixer**：CSS自动前缀

## 🚀 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- npm 或 pnpm 包管理器

### 安装步骤

1. **克隆项目**
```bash
git clone <https://github.com/qishiyou/Video-quote.git>
cd Video-baojia
```

2. **安装依赖**
```bash
# 使用 npm
npm install

# 或使用 pnpm（推荐）
pnpm install
```

3. **启动开发服务器**
```bash
# 使用 npm
npm run dev

# 或使用 pnpm
pnpm dev
```

4. **访问应用**
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建和部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 📁 项目结构

```
Video-baojia/
├── 📁 app/                     # Next.js App Router
│   ├── 📁 contact/             # 联系我们页面
│   ├── 📁 help/                # 帮助中心页面
│   ├── 📁 about/               # 关于我们页面
│   ├── 📁 cases/               # 案例展示页面
│   ├── 📁 services/            # 服务介绍页面
│   ├── 📁 quote/               # 报价相关页面
│   ├── 📁 test/                # 测试页面
│   ├── 🎨 globals.css          # 全局样式
│   ├── 📄 layout.tsx           # 根布局组件
│   └── 🏠 page.tsx             # 主页面
├── 📁 components/              # React组件
│   ├── 📝 QuoteForm.tsx        # 报价表单组件
│   ├── 🌓 ThemeToggle.tsx      # 主题切换组件
│   └── 🦶 Footer.tsx           # 页脚组件
├── 📁 contexts/                # React上下文
│   └── 🌓 ThemeContext.tsx     # 主题上下文
├── 📁 lib/                     # 工具库（如存在）
│   ├── 📘 types.ts             # TypeScript类型定义
│   ├── 💰 pricing.ts           # 价格计算引擎
│   └── 📄 pdfGenerator.ts      # PDF生成器
├── 📦 package.json             # 项目配置和依赖
├── ⚙️ tailwind.config.js       # Tailwind CSS配置
├── 📘 tsconfig.json            # TypeScript配置
├── ⚙️ next.config.js           # Next.js配置
└── 📖 README.md                # 项目文档
```

## 📖 使用指南

### 基本使用流程

1. **📝 填写项目信息**
   - 选择项目所在地区
   - 选择视频类型（宣传片、广告片等）
   - 设置拍摄天数和影片时长

2. **⚙️ 配置制作规格**
   - 选择创意策划等级
   - 配置摄制团队规模
   - 选择拍摄设备等级
   - 设置拍摄场景

3. **👥 人员和后期配置**
   - 选择演员配置
   - 配置配音配乐需求
   - 设置剪辑特效等级

4. **💰 生成报价**
   - 点击"立即报价"按钮
   - 查看详细价格明细
   - 确认报价内容

5. **📄 下载PDF**
   - 点击"生成PDF"按钮
   - 下载专业报价单文档

### 主题切换
- 点击页面右上角的主题切换按钮
- 支持明亮模式和暗黑模式
- 系统会记住您的主题偏好

### 联系方式
- 访问"联系我们"页面查看详细联系信息
- 点击微信图标查看微信二维码
- 点击GitHub图标访问项目仓库

## 💰 价格计算逻辑

系统采用多维度价格计算模型：

- **📹 视频类型基础价格**：不同类型视频的基础定价
- **📅 拍摄天数系数**：根据拍摄天数调整价格
- **⏱️ 影片时长系数**：根据最终影片时长计算
- **💡 创意策划费用**：策划等级对应的费用
- **👥 摄制团队系数**：团队规模和专业程度
- **📷 设备等级系数**：拍摄设备的等级和费用
- **🎬 场景费用**：拍摄场景的相关费用
- **🎭 演员费用**：演员配置的相关费用
- **🎵 配音配乐费用**：音频制作相关费用
- **✂️ 剪辑特效费用**：后期制作相关费用

## 🎨 设计特点

- **🎯 用户体验优先**：直观的界面设计和流畅的交互体验
- **📱 响应式布局**：完美适配各种设备屏幕
- **🌓 主题适配**：支持明暗主题，保护用户视力
- **⚡ 性能优化**：基于Next.js的服务端渲染和优化
- **🔒 类型安全**：TypeScript提供完整的类型检查
- **🎭 动画效果**：Framer Motion提供流畅的动画体验

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献

1. **🍴 Fork 项目**
2. **🌿 创建功能分支** (`git checkout -b feature/AmazingFeature`)
3. **💾 提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **📤 推送到分支** (`git push origin feature/AmazingFeature`)
5. **🔄 创建 Pull Request**

### 开发规范

- 遵循现有的代码风格
- 添加适当的注释和文档
- 确保所有测试通过
- 更新相关文档

### 报告问题

如果您发现了bug或有功能建议，请：
1. 检查是否已有相关issue
2. 创建详细的issue描述
3. 提供复现步骤（如适用）

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

## 📞 联系我们

- **📧 邮箱**：contact@example.com
- **📱 电话**：+86 138-0000-0000
- **📍 地址**：甘肃省庆阳市西峰区
- **💬 微信**：扫描应用内二维码
- **🐙 GitHub**：[项目仓库](https://github.com/qishiyou/Video-quote)

---

<div align="center">
  <p>⭐ 如果这个项目对您有帮助，请给我们一个星标！</p>
  <p>Made with ❤️ by Video Production Team</p>
</div>