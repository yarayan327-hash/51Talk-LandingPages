## 🤖 Assistant

以下是整理后的 `.md` 文档，可直接放在 `/docs/BRANCHING_GUIDE.md` 路径下使用：

---

```markdown
# 🌿 分支命名与修改规范 - 51Talk Landing Pages System

> 本规范用于统一落地页系统的分支命名、修改流程和合并规则，  
> 适用于所有开发人员及 Claude Code 自动化修改任务。

---

## 🧭 一、分支命名规则

所有分支名称需采用 **类型/描述性短语** 格式：

```
<type>/<short-description>
```

### 🎯 常见类型

| 类型       | 用途说明                         | 示例                          |
|------------|----------------------------------|-------------------------------|
| `feature`  | 新功能开发、页面新增、模块改版    | `feature/add-trial-landing-page` |
| `fix`      | 修复问题或Bug                    | `fix/rtl-layout-overlap`         |
| `ui`       | 视觉风格、排版、组件样式更新      | `ui/update-global-theme`         |
| `content`  | 文案更新、图片替换、语言内容调整  | `content/refresh-arabic-copy`    |
| `config`   | 配置调整（Tailwind、主题、等）    | `config/update-tailwind-theme`   |
| `refactor` | 重构、性能优化、结构调整          | `refactor/split-hero-section`    |
| `test`     | 测试、演示或实验性功能            | `test/layout-experiment`         |

---

## 🪄 二、命名示例

| 目标                  | 分支命名示例                  |
|-----------------------|----------------------------|
| 新增阿拉伯语首页         | `feature/add-arabic-homepage` |
| 调整 Hero 区背景与排版  | `ui/hero-layout-update`       |
| 修复移动端图片错位       | `fix/mobile-image-overlap`    |
| 更新课程内容文案         | `content/course-copy-update`  |
| 修改全局主题色与字体     | `ui/global-theme-refresh`     |
| 优化加载速度            | `refactor/optimize-image-loading` |
| 调整 Tailwind 配置文件  | `config/tailwind-colors-update` |

---

## ⚙️ 三、修改与合并流程

### 1️⃣ 创建分支

```bash
git checkout -b ui/hero-layout-update
```

### 2️⃣ 提交更改

```bash
git add .
git commit -m "🎨 Update hero section layout and typography"
```

### 3️⃣ 推送到远程

```bash
git push origin ui/hero-layout-update
```

### 4️⃣ 创建 Pull Request（PR）

- **标题格式**：

  ```
  🎨 [UI] Update hero layout and global typography
  ```

- **描述模板**：

  ```
  ## 变更内容
  - 更新 Hero 区背景与间距
  - 优化主色与辅助色对比度
  - 修复移动端溢出问题

  ## 影响范围
  - HeroSection.tsx
  - theme.css
  ```

### 5️⃣ 合并规则

| 分支类型                        | 合并目标          | 审核要求        |
|------------------------------|-----------------|---------------|
| `feature/*`, `ui/*`          | → `develop`     | 需通过预览与测试   |
| `fix/*`, `content/*`         | → `main`/`develop` | 简单验证后可合并   |
| `config/*`, `refactor/*`     | → `develop`     | 必须代码审核通过   |

---

## 🧩 四、Claude Code 专用提示模板

当使用 Claude Code 自动修改时，请在提示词中明确分支：

```bash
请基于分支 ui/global-theme-refresh 执行以下操作：
1. 更新 Hero 区背景图样式；
2. 调整全局主色为 #0055B8；
3. 提交并推送到该分支。
```

Claude Code 将：

- 自动切换到对应分支；
- 执行文件修改；
- 生成 commit；
- 推送结果供你合并。

---

## 🛠 五、其他建议

- 每个分支的修改范围尽量**单一**（一个任务对应一个分支）；
- 不在 `main` 分支上直接修改；
- 所有提交信息建议使用表情符号前缀（可选但推荐）：
  - 🎨 UI / 视觉相关
  - 📝 文案内容
  - 🧩 新功能
  - 🐛 修复问题
  - ⚙️ 配置修改
  - 🚀 性能优化
  - 🔧 代码重构

---

## 🏁 六、可视化工作流建议

你可以使用：

- **GitHub Projects** 管理任务；
- **Pull Request 模板**（`.github/PULL_REQUEST_TEMPLATE.md`）统一描述；
- **Claude Code 自动更新分支** 实现持续改进。

---

🧭 **最后更新**：2025-11  
📄 **文件路径**：`/docs/BRANCHING_GUIDE.md`  
👤 **维护人**：Yara（项目负责人）  
```

---

**你可以这样让 Claude Code 应用这个规范：**

```bash
请在项目 /Users/jin/landing page-Academy/ 下创建文件 /docs/BRANCHING_GUIDE.md，
内容为以上分支命名与修改规范。
并确保后续自动修改或生成分支时，遵循该规范命名。
```
