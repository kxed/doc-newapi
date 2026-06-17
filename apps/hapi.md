# Hapi 远程控制配置指南

随时随地远程控制你的 AI 编程助手

作者： weishu 官方文档： https://hapi.run/

📋 简介

Hapi 是一个本地优先的应用程序，可以让你在本地运行 Claude Code / Codex / Gemini 会话，并通过 Web / PWA / Telegram Mini App 进行远程控制。这意味着你可以在手机或浏览器上监控和管理你的 AI 编程任务。

## 相关链接

| 资源 | 地址 |
| --- | --- |
| Hapi 官网 | https://hapi.run/ |
| Hapi 仓库 | https://github.com/tiann/hapi |
| 快速开始 | 官方快速开始文档 |
| Cloudflare Tunnel 文档 | 创建远程隧道 |

## 核心功能

Hapi 提供以下强大功能：

- ✅ 多后端支持：支持 Claude Code、Codex、Gemini
- ✅ 进度跟踪：通过待办事项列表跟踪进度
- ✅ 文件浏览：浏览文件和查看 git diff
- ✅ 权限控制：远程批准/拒绝工具权限
- ✅ 移动监控：通过手机或浏览器监控和管理任务
- ✅ 远程会话：从任何设备发起远程会话
- ✅ 无缝切换：在本地原生环境和远程控制之间无缝切换

## 安装步骤

### 第一步：安装 Hapi

💡 前置要求

请确保已安装 Node.js 18+ 环境。如需安装，请参考 Node.js 环境安装。

访问 Hapi 官方快速开始文档了解详细的安装方法。

推荐使用 npx 快速启动 Hapi 服务器：

```bash
npx @twsxtd/hapi server
```

启动后会显示 Token 凭证和访问地址。

⚠️ 重要提示

请务必保存好 Token 凭证！ 这是你连接和控制 Hapi 服务的唯一凭证。

### 第二步：启动 AI 会话

在项目目录下执行以下命令启动对应的 AI 服务：

启动 Claude Code：

```bash
hapi claude
```

启动 Codex：

```bash
hapi codex
```

启动 Gemini：

```bash
hapi gemini
```

启动成功后，前端界面会显示连接状态。

🎉 局域网访问

此时你已经可以在本地局域网内通过 `http://<IP>:3006` 访问和控制你的 AI 编程助手了！

## 配置 Cloudflare 内网穿透

如果你想在任何地方（包括外网）访问你的 Hapi 服务，可以通过 Cloudflare Tunnel 实现内网穿透。

### 前置要求

- Cloudflare 账号（免费账号即可）
- 一个域名（任意域名均可）

### 配置流程

按照 Cloudflare Tunnel 官方文档进行配置：

1. 登录 Cloudflare Zero Trust 控制台
2. 创建新的 Tunnel
3. 安装 cloudflared 客户端
4. 配置隧道名称
5. 配置公共主机名
6. 设置服务地址：将服务地址设置为 `localhost:3006`（Hapi 默认端口）
7. 完成配置

## 使用 Hapi

配置完成后，你可以：

1. 公网访问：`https://your-domain.com`（如果配置了 Cloudflare Tunnel）
2. 局域网访问：`http://<IP>:3006`
3. 本地访问：`http://localhost:3006`

使用步骤：

1. 打开浏览器访问 Hapi 地址
2. 输入 Token 登录
3. 选择要启动的 AI 后端（Claude / Codex / Gemini）
4. 开始远程控制你的 AI 编程助手

💡 使用技巧

- 支持多设备同时连接和控制
- 可以安装为 PWA 应用，获得类似原生应用的体验
- 在手机浏览器中访问可以随时随地监控任务进度

## 安全建议

- 仅在可信网络环境下使用
- 定期更换 Token
- 如果使用公网访问，建议启用 Cloudflare 的安全功能（如 Access 策略）
- 不要将 Token 泄露给他人

## 常见问题

### 提示无法连接到服务器？

- 检查 Token 是否正确
- 确认防火墙未阻止 3006 端口
- 检查 Hapi 服务是否正常运行

### Cloudflare Tunnel 配置失败？

- 查看 cloudflared 日志排查问题
- 检查 cloudflared 客户端是否正确安装
- 确认域名已正确添加到 Cloudflare

### 更多问题

请查看 FAQ 或访问 Hapi GitHub Issues。

## 进阶优化

如果你想进一步提升 Hapi 的访问速度（特别是在国内网络环境下），可以配置 Cloudflare 优选 IP：

💡 速度优化

通过配置 Cloudflare 优选 IP，可以将访问延迟从几百毫秒降低到几十毫秒，实现接近直连的体验。

👉 查看详细教程： [Hapi 进阶：Cloudflare 优选 IP 高速穿透](/apps/hapi-advanced)
