# 创建专属 Key

注册登录后，点击创建专属 Key。

## 创建步骤

1. 登录 Claude360 平台
2. 进入控制台
3. 点击"创建 Key"按钮
4. 配置 Key 参数
5. 保存并复制 Key

## Key 类型

根据您要使用的工具，选择对应的令牌组：

### Claude Code 令牌

用于 Claude Code CLI 工具，支持 Claude 系列模型。

### CodeX 令牌

用于 CodeX 工具，需要选择"codex测试"令牌组。

### Gemini CLI 令牌

用于 Gemini CLI 工具，支持 Gemini 系列模型。

::: warning 重要提示
不同工具需要使用不同的令牌组，请根据您的需求创建对应的 Key。
:::

## Key 配置参数

创建 Key 时，可以配置以下参数：

### 名称

为您的 Key 设置一个易于识别的名称，方便管理多个 Key。

### 令牌组

选择对应的工具令牌组：

- Claude Code
- CodeX 测试
- Gemini CLI

### 配额限制

可以设置：

- 无限额度（推荐）
- 自定义额度限制

### 过期时间

可以设置 Key 的有效期，或选择永不过期。

## 安全建议

::: danger 安全提醒
- 不要将 Key 分享给他人
- 不要将 Key 提交到代码仓库
- 不要在公开场合展示 Key
- 使用环境变量或配置文件存储 Key
- 定期更换 Key 提高安全性
:::

## 保存 Key

创建成功后，请立即保存好您的 Key：

```bash
# 示例 Key（请替换为您的实际 Key）
sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

::: tip 提示
Key 只会显示一次，请务必保存好。如果丢失，需要重新创建。
:::

## 下一步

- [修改令牌设置](/guide/modify-token) - 调整令牌参数
- [配置环境变量](/deploy/claude-code#配置环境变量) - 在工具中使用 Key
- [充值](/guide/recharge) - 确保账户有足够余额
