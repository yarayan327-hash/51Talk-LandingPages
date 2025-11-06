# 51Talk Academy - 分支命名与修改规范

## 📋 概述

本文档定义了 51Talk Academy 项目的分支命名规范、提交信息格式以及 PR 模板，确保团队协作的一致性和代码管理的规范性。

## 🌿 分支命名规范

### 格式：`type/short-description`

所有分支名称必须遵循以下格式：

```
type/short-description
```

### 分支类型 (type)

| 类型 | 说明 | 示例 |
|------|------|------|
| `feature` | 新功能开发 | `feature/user-authentication` |
| `ui` | UI/UX 相关修改 | `ui/update-global-theme` |
| `content` | 内容相关修改 | `content/add-chinese-translations` |
| `fix` | 错误修复 | `fix/resolve-login-bug` |
| `refactor` | 代码重构 | `refactor/optimize-api-calls` |
| `docs` | 文档更新 | `docs/update-readme` |
| `test` | 测试相关 | `test/add-unit-tests` |
| `config` | 配置修改 | `config/update-webpack-config` |
| `deploy` | 部署相关 | `config/production-deployment` |
| `hotfix` | 紧急修复 | `hotfix/security-patch` |
| `chore` | 维护任务 | `chore/update-dependencies` |

### 描述规范 (short-description)

- 使用小写字母
- 单词之间用连字符 `-` 分隔
- 简洁明了，描述分支的主要目的
- 长度控制在 50 个字符以内

### 示例分支名称

```
feature/user-profile-system
ui/responsive-navigation-menu
content/arabic-language-support
fix/memory-leak-issue
refactor/component-architecture
docs/api-documentation-update
test/integration-test-suite
config/ci-cd-pipeline
deploy/staging-environment
hotfix/critical-security-fix
chore/npm-dependency-update
```

## 📝 提交信息规范

### 格式：`emoji type(scope): description`

所有提交信息必须遵循以下格式：

```
emoji type(scope): description
```

### 表情符号映射

| 类型 | 表情符号 | 说明 |
|------|----------|------|
| feature | ✨ | 新功能 |
| ui | 🎨 | UI/UX 修改 |
| content | 📝 | 内容更新 |
| fix | 🐛 | 错误修复 |
| refactor | ♻️ | 代码重构 |
| docs | 📚 | 文档更新 |
| test | ✅ | 测试相关 |
| config | ⚙️ | 配置修改 |
| deploy | 🚀 | 部署相关 |
| hotfix | 🚨 | 紧急修复 |
| chore | 🔧 | 维护任务 |

### 提交信息示例

```
✨ feature(auth): add user authentication system
🎨 ui(components): update global theme colors
📝 content(translations): add Arabic language support
🐛 fix(api): resolve memory leak in data fetching
♻️ refactor(utils): optimize data processing functions
📚 docs(readme): update installation instructions
✅ test(components): add unit tests for header component
⚙️ config(webpack): update build configuration
🚀 deploy(production): deploy to staging environment
🚨 hotfix(security): patch XSS vulnerability
🔧 chore(deps): update npm dependencies
```

## 🔀 PR 标题与描述模板

### PR 标题格式

PR 标题应该与分支名称保持一致，但更加用户友好：

```
[type] Brief description of changes
```

### PR 描述模板

```markdown
## 📋 变更概述
简要描述本次 PR 的主要变更内容。

## 🎯 变更类型
- [ ] 新功能 (feature)
- [ ] UI/UX 改进 (ui)
- [ ] 内容更新 (content)
- [ ] 错误修复 (fix)
- [ ] 代码重构 (refactor)
- [ ] 文档更新 (docs)
- [ ] 测试相关 (test)
- [ ] 配置修改 (config)
- [ ] 部署相关 (deploy)
- [ ] 紧急修复 (hotfix)
- [ ] 维护任务 (chore)

## 📸 截图/演示
如果是 UI 相关的变更，请提供截图或 GIF 演示。

## 🔗 相关 Issue
关联的相关 Issue 编号：
- Closes #issue-number

## ✅ 测试清单
- [ ] 代码已通过 ESLint 检查
- [ ] 新功能已添加单元测试
- [ ] 手动测试通过
- [ ] 响应式设计测试通过
- [ ] 多语言功能测试通过

## 🧪 测试环境
- [ ] 本地开发环境
- [ ] 测试环境
- [ ] 预生产环境

## 📱 兼容性
- [ ] Chrome (最新版本)
- [ ] Firefox (最新版本)
- [ ] Safari (最新版本)
- [ ] Edge (最新版本)
- [ ] 移动端浏览器

## 📝 审查要点
请审查者重点关注以下方面：
- 代码质量和可维护性
- 性能影响
- 安全性考虑
- 用户体验改进
- 测试覆盖率

## 📚 参考资料
相关的文档链接或参考资料。
```

## 🔄 工作流程

### 1. 创建分支

```bash
git checkout -b type/short-description
```

示例：
```bash
git checkout -b ui/update-global-theme
```

### 2. 开发与提交

```bash
git add .
git commit -m "✨ ui(theme): update global color scheme"
```

### 3. 推送分支

```bash
git push origin type/short-description
```

### 4. 创建 PR

- 使用 PR 标题格式：`[UI] Update Global Theme`
- 填写 PR 描述模板
- 关联相关 Issue
- 请求代码审查

### 5. 合并分支

- 审查通过后，使用 Squash and Merge
- 确保提交信息清晰明确
- 删除已合并的分支

## 🎯 最佳实践

### 分支管理
- 每个分支专注于单一功能或修复
- 保持分支更新，定期从 main 分支合并最新代码
- 避免长期存在的分支

### 提交质量
- 每个提交应该是一个完整的逻辑单元
- 提交信息应该清晰描述变更内容
- 避免在单个提交中混合多种类型的变更

### PR 规范
- 确保 CI/CD 通过所有检查
- 提供充分的测试和文档
- 及时响应审查意见

## 🔧 工具配置

推荐的 Git 配置：

```bash
# 设置分支模板
git config --global init.defaultBranch main

# 设置编辑器
git config --global core.editor "code --wait"

# 设置提交模板（可选）
git config --global commit.template .git/commit-template.txt
```

## 📞 联系方式

如有疑问或建议，请联系项目维护者或团队负责人。

---

*本文档由项目团队维护，最后更新时间：2024年*