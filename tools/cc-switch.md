# CC-Switch 快速配置工具

All-in-One AI CLI 管理器 - 桌面应用程序

## 相关链接

| 资源 | 地址 |
| --- | --- |
| GitHub 发布页 | [cc-switch/releases](https://github.com/farion1231/cc-switch/releases) |
| CC-Switch 文档站 | [ccswitch.lovable.app](https://ccswitch.lovable.app) |

## 工具介绍

CC-Switch 是一款跨平台桌面应用程序，统一管理 Claude Code、Codex 和 Gemini CLI 三大 AI 编程工具。通过直观的图形界面，实现配置切换、MCP 服务器管理、系统提示和 Claude Skills 管理。

::: tip 💡 核心功能
- 一键切换不同 AI 工具的提供商配置
- API 端点速度测试与质量指示器
- 多预设系统提示管理
- MCP 服务器统一架构管理
- Claude Skills 发现与安装系统
- 配置备份/恢复（自动保留最近10个）
- 深度链接协议支持（`ccswitch://`）
- 环境变量冲突检测
:::

::: info ✨ v3.8.0 架构升级亮点
- SQLite + JSON 双层存储（SSOT原则）
- 全新UI设计与精致组件样式
- 支持日语界面
- 开机自动启动功能
- Skills 递归目录扫描
:::

## 安装方法

### Windows 平台

#### 方法一：MSI 安装器（推荐）

1. 访问项目发布页： https://github.com/farion1231/cc-switch/releases
2. 下载最新版本的 `.msi` 安装器
3. 运行安装器，按照向导完成安装
4. 安装完成后从开始菜单启动 CC-Switch

#### 方法二：便携版（无需安装）

1. 下载 `.zip` 便携版压缩包
2. 解压到任意目录
3. 运行 `cc-switch.exe` 即可使用

### macOS 平台

#### 推荐方式：Homebrew 安装

```bash
# 添加 tap 源
brew tap farion1231/ccswitch

# 安装 cc-switch
brew install --cask cc-switch
```

#### 手动安装

1. 访问 [Releases 页面](https://github.com/farion1231/cc-switch/releases)
2. 下载 `.dmg` 安装包
3. 打开 DMG 文件，将 CC-Switch 拖入应用程序文件夹
4. 从启动台或应用程序文件夹启动

### Linux 平台

#### Debian/Ubuntu 系列（推荐）

```bash
sudo dpkg -i cc-switch_*.deb
sudo apt-get install -f  # 修复依赖
```

#### AppImage 通用版本

```bash
chmod +x cc-switch_*.AppImage
./cc-switch_*.AppImage
```

#### Arch Linux（AUR）

```bash
paru -S cc-switch-bin
# 或使用 yay
yay -S cc-switch-bin
```

## 快速开始

### 第一步：添加提供商配置

填写以下信息：

- **提供商名称**：自定义名称（如"Claude360"）
- **API 密钥**：从 https://claude360.xyz 获取
- **API 端点**：`https://claude360.xyz`
- **模型选择**：根据需求选择可用模型

::: warning ⚠️ 重要提示
不同的AI工具（Claude Code、Codex、Gemini CLI）可能需要不同的令牌组配置。 请在 Claude360 平台创建对应的专用令牌。
:::

### 第二步：切换提供商

1. 在提供商列表中选择要使用的配置
2. 点击「启用」按钮
3. 或使用系统托盘图标进行即时切换

系统托盘快速切换：

- 右键点击系统托盘中的 CC-Switch 图标
- 从菜单中直接选择要切换的提供商
- 配置立即生效

### 第三步：应用配置

切换配置后，关闭并重新启动对应的 AI 工具即可自动应用新配置。

## 高级功能

### API 端点速度测试

测试不同提供商的响应速度和质量：

1. 在提供商列表中找到目标配置
2. 点击「测试速度」按钮
3. 查看延迟和质量指标
4. 根据结果选择最优提供商

### 系统提示管理

- 创建针对不同场景的系统提示
- 快速切换不同的提示预设
- 导入/导出提示配置

### MCP 服务器管理

- 在一个界面中配置所有 MCP 服务器
- 自动同步到对应的配置文件
- 支持启用/禁用服务器

### Claude Skills 管理

- 浏览可用的 Skills 列表
- 一键安装需要的 Skills
- 递归扫描本地 Skills 目录

### 配置备份与恢复

- 每次修改配置时自动创建备份
- 保留最近10个备份版本
- 一键恢复到任意历史版本
- 导出/导入配置文件

## 使用技巧

::: tip 提示 1：开机自动启动
在设置中启用「开机自动启动」选项，CC-Switch 将在系统启动时自动运行并最小化到系统托盘。
:::

::: tip 提示 2：环境变量冲突检测
CC-Switch 会自动检测并提示环境变量冲突，避免配置问题导致 CLI 工具无法正常运行。
:::

::: tip 提示 3：多语言支持
v3.8.0 版本新增日语界面支持，可在设置中切换语言。
:::

## 项目资源

- **GitHub 仓库**： https://github.com/farion1231/cc-switch
- **问题反馈**：[GitHub Issues](https://github.com/farion1231/cc-switch/issues)
- **最新版本**：[Releases 页面](https://github.com/farion1231/cc-switch/releases)

::: info 🎉 开始使用！
现在您可以使用 CC-Switch 轻松管理多个 AI 编程工具的配置了。 享受高效的开发体验！
:::
