# OpenCode 配置指南

开源 AI 编程助手，终端中的智能编码伙伴

📋 简介

OpenCode 是一款开源的 AI 编程助手，可在终端、IDE 或桌面环境中辅助编写、调试和改进代码。支持原生终端 TUI 界面、多会话并行、75+ 模型提供商接入，是命令行开发者的理想工具。

## 相关链接

| 资源 | 地址 |
| --- | --- |
| OpenCode 项目 | https://github.com/opencode-ai/opencode |

## 功能特点

- ✅ 原生终端 TUI：专为命令行开发者设计，高效流畅
- ✅ 智能 LSP 加载：自动加载正确的语言服务器，提升上下文理解
- ✅ 多会话并行：支持多个会话同时运行，互不干扰
- ✅ 会话链接共享：可分享会话链接给他人协作
- ✅ 75+ 模型支持：支持多种模型提供商，包括本地模型
- ✅ 多平台支持：终端 CLI、桌面应用（Beta）、IDE 扩展

## 安装与配置

### 第一步：安装 OpenCode

打开终端，运行以下命令全局安装 OpenCode：

```bash
npm install -g opencode-ai
```

安装完成后，在终端输入 `opencode` 命令，若出现 TUI 界面则安装成功。

### 第二步：安装 CC-Switch

查看 CC-Switch 配置工具文档，下载并安装 CC-Switch 到本地。

### 第三步：添加 Claude360 供应商

1. 选择配置项

打开 CC-Switch，上方配置项选择 `OpenCode`，然后点击 添加供应商 按钮。

2. 填写供应商信息

按以下说明配置各项参数：

| 配置项 | 说明 |
| --- | --- |
| 预设供应商 | 选择 `Claude360` |
| 供应商标识 | 自定义名称，如 `Claude360-Claude` |
| 接口格式 | Claude 模型选 `Anthropic`；GPT 模型选 `OpenAI`；Gemini 模型选 `Google (Gemini)` |
| API Key | 填入你在 Claude360 控制台创建的 Key |
| 额外选项 | 填写 `{"setCacheKey":true}` |

💡 支持的分组

根据你需要的模型类型，选择正确分组的 API Key：

- Claude 系列：只允许逆向分组
- GPT 系列：Codex 分组
- Gemini 系列：Gemini 分组

请在创建专属 Key 时选择对应分组。

## 验证配置

1. 重新打开终端，输入 `opencode` 运行
2. 输入 `/models` 命令，检查配置的渠道是否出现在模型列表中
3. 如果能看到你添加的模型，说明配置成功

开始愉快地编码吧！🎉

## 常见问题

### 安装时提示 npm 未找到？

请先安装 Node.js 环境，参考 Node.js 环境安装文档。

### 模型列表中看不到配置的渠道？

- 确认 CC-Switch 中已正确保存配置
- 重启终端后再次运行 `opencode`
- 检查 API Key 是否填写正确

### 更多问题

请查看 FAQ 或联系售后支持。
