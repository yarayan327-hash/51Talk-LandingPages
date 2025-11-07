## 🤖 Assistant

---

```markdown
# 🧠 Claude Code Project Configuration

> 本文件用于定义 Claude Code 在本项目中的开发、修改与提交规范。  
> 所有分支、提交、PR、与视觉/UI 更新操作，都需严格遵守以下规则。

---

## 📁 1. 规范来源

- 主参考文件: `/docs/BRANCHING_GUIDE.md`
- 所有命名、提交与 PR 模板以该文件为准。
- 若规范文件更新，请自动同步并应用最新规则。

---

## 🌿 2. 分支命名规则

- 格式: `type/short-description`
- 支持类型（共 11 种）：
  - `feature/` 新功能
  - `ui/` 界面与交互调整
  - `content/` 文案或图片内容修改
  - `fix/` 修复错误或问题
  - `refactor/` 重构代码
  - `docs/` 文档更新
  - `test/` 测试用例
  - `config/` 配置文件或构建调整
  - `deploy/` 部署与发布
  - `hotfix/` 紧急修复
  - `chore/` 其他杂项任务

### ✅ 示例：

```
ui/update-hero-section-bg
feature/add-login-api
fix/form-validation-error
```

---

## 💬 3. 提交信息格式

格式：`emoji type(scope): description`

| 类型     | 表情 | 说明          |
|----------|------|---------------|
| feat     | ✨   | 新功能        |
| ui       | 🎨  | 界面、排版、配色 |
| content  | 📝  | 文案或多语言内容 |
| fix      | 🐛  | 修复 bug      |
| refactor | ♻️  | 代码重构      |
| docs     | 📚  | 文档更新      |
| test     | ✅   | 测试          |
| config   | ⚙️   | 配置调整      |
| deploy   | 🚀  | 部署          |
| hotfix   | 🔥  | 紧急修复      |
| chore    | 🧹  | 杂项任务      |

**示例：**

```
🎨 ui(hero): adjust gradient background and padding
🐛 fix(form): correct email validation regex
📚 docs: update branching guide examples
```

---

## 🔧 4. Pull Request 规范

- PR 标题格式: `[type] Brief description`
- PR 描述模板：自动读取自 `/.github/PULL_REQUEST_TEMPLATE.md`
- 若未检测到模板，应提醒用户在提交前添加描述。

**示例：**

```
[ui] Improve hero section background and typography
```

---

## 🎨 5. 视觉与排版修改规范

- 所有涉及配色、字体、排版、图标、背景的更新：
  - 必须从 `/Users/jin/landing page-Academy/README.md` 中读取视觉规范；
  - 并创建 `ui/` 类型分支；
  - 所有样式变更需保留前后对比注释（Before / After）。

**示例：**

```
ui/adjust-color-palette
```

---

## 🧩 6. 代码评审与合并

- 所有 PR 需通过至少一次 review。
- PR 合并后自动关闭相关 issue。
- 若包含紧急修复，应标记为 `hotfix` 并优先处理。

---

## 🧭 7. Claude Code 行为准则

- Claude Code 在执行任何 Git 操作前，应检查：
  1. 是否符合 `/docs/BRANCHING_GUIDE.md`
  2. 是否使用正确类型前缀（如 `ui/`、`fix/`）
  3. 提交信息是否包含 emoji
- 若不符合规范，应自动给出修正建议而非直接提交。

---

✅ **项目状态**
- 分支规范：已启用  
- PR 模板：已加载  
- 视觉规范：已连接  
- 本地路径：`/Users/jin/education-landing-page/.claude.md`  

---

_© 2025 51Talk Academy Internal Development Standards_
```

---
