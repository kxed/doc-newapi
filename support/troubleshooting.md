# 疑难杂症排查指南

本文档汇总了 Claude Code、CodeX、Gemini CLI 等 AI 编程工具的常见问题和解决方案。

## 服务状态查看

在排查问题前，建议先查看服务状态。

---

## 一、Claude Code 启动时跳登录

### 问题描述

启动 Claude Code 时，反复弹出登录界面。

### 解决方案

#### 方案一：参考官方教程

#### 方案二：修改 settings.json 文件

在 Claude Code 的`settings.json`文件中添加以下配置：

```json
{
  "apiKeyHelper": "echo 'xxx'",
  "env": {
    "ANTHROPIC_BASE_URL": "xxx",
    "ANTHROPIC_AUTH_TOKEN": "xxx"
  }
}
```

将`xxx`替换为您的实际配置信息。

---

## 二、使用过程中出现 400 报错

### 问题原因

这是官方 Claude Code（CC）的已知问题，通常是会话状态异常导致。

### 解决方式

#### 方法一：清空会话重启

使用`/clear`命令重新开启会话。

> **注意：** 原会话内容会丢失

#### 方法二：进阶恢复方案（保留历史记录）

1. 进入`.claude`目录，找到`history`文件
2. 直接让 CC 读取该文件

本质原理：让 CC 直接读取本地会话数据文件，而不是在原会话中继续对话

辅助说明：

- 使用`/status`可查看当前对话的 ID
- CC 会根据 ID 自动查找对应的会话数据

---

## 三、Gemini CLI 使用一段时间后卡住/停止响应

### 问题原因

Gemini CLI 官方适配存在问题，长时间使用后可能出现无响应。

### 解决方案

改用 VS Code 插件替代 CLI：

- RooCode
- Kilo

这些插件提供了更稳定的 Gemini 使用体验。

---

## 四、使用 Kilo/Roo 时 Token 消耗过快

### 原因分析

- Roo 和 Kilo 内置 Prompt 非常大
- 插件的模式设计本身就不太考虑 Token 成本

### 结论

👉 属于设计层面问题，非个人配置错误

这是这些插件的固有特性，建议根据使用需求选择合适的工具。

---

## 五、模型使用体验对比

### 简要对比

- Gemini：Web 前端体验较好
- Claude Opus：代码质量高
- Codex：整体速度偏慢（例外：Codex Max 模型速度较快）

### 补充说明

"感觉模型变傻了"是常见现象，主流模型通常：

- 刚上线时性能最强
- 后期可能会逐步降配或限速

---

## 六、遇到「令牌无效」问题

### 前提确认

确保分组令牌（Group Token）配置正确。

### Windows 系统检查方法

#### PowerShell 命令检查

```powershell
$Env:ANTHROPIC_AUTH_TOKEN
$Env:ANTHROPIC_BASE_URL
```

如果变量存在，会直接显示值；不存在则为空。

#### 图形界面设置

1. 右键「此电脑 / My Computer」→ 属性
2. 高级系统设置
3. 点击「环境变量」
4. 查找：`ANTHROPIC_AUTH_TOKEN`和`ANTHROPIC_BASE_URL`

### macOS 系统检查方法

```bash
echo $ANTHROPIC_AUTH_TOKEN
echo $ANTHROPIC_BASE_URL
```

若无输出，说明当前会话未加载该变量。

---

## 七、API Connect Error 排查

### 排查方向

本地网络异常

- 检查网络连接是否正常
- 尝试访问其他网站验证网络

代理/梯子不稳定

- 检查代理配置
- 尝试切换代理节点

### 建议

👉 尝试直接使用直连网络

关闭代理后测试是否恢复正常。

---

## 八、CC 上下文过大导致异常

### 问题表现

对话中出现异常错误，通常与上下文过大有关。

### 解决方案

新建会话

- 开启新的对话，清空上下文

查看 Token 分布

```
/context
```

查看当前上下文的 Token 使用情况

关闭自动压缩

- 关闭 Auto Compress（自动压缩）功能
- 手动控制上下文大小

---

## 九、Request Timed Out（请求超时）

### 可能原因

1. 本地网络连接问题
2. 代理或梯子状态不稳定
3. 服务端负载过高

### 解决方案

- 检查本地网络连接
- 检查代理或梯子状态
- 必要时尝试直连网络
- 查看服务状态页确认服务可用性

---

## 十、API Error 503

### 错误说明

当前分组服务不可用。

### 解决方案

1. 切换至其他可用服务分组
2. 通过状态页确认分组状态

---

## 十一、Gemini CLI 报错 400

### 问题说明

当前会话异常，通常是会话状态错误导致。

### 解决方案

直接重开会话即可解决。

---

## 十二、Claude Code 2.0.73 版本内容割裂

### 问题说明

在 2.0.73 版本中出现对话/内容割裂问题。

### 解决方案：回退版本

```bash
npm install -g @anthropic-ai/[email protected]
```

回退到稳定的 2.0.72 版本。

---

## 十三、如何关闭 Claude Code 自动更新

### 问题描述

不希望 Claude Code 自动更新到新版本。

### 解决方案

在`settings.json`中添加以下环境变量：

```json
{
  "env": {
    "DISABLE_AUTOUPDATER": "1"
  }
}
```

或在系统环境变量中设置：

```bash
# macOS/Linux
export DISABLE_AUTOUPDATER=1

# Windows PowerShell
$Env:DISABLE_AUTOUPDATER = "1"
```

---

## 排查技巧总结

### 快速诊断流程

1. ✅ 查看服务状态页
2. ✅ 检查环境变量配置
3. ✅ 验证令牌是否有效
4. ✅ 检查网络和代理状态
5. ✅ 查看 Token 余额
6. ✅ 尝试重新开启会话

### 常用调试命令

#### Claude Code

```bash
/status    # 查看当前会话状态
/context   # 查看上下文 Token 使用
/clear     # 清空当前会话
```

### 环境变量检查

#### Windows

```powershell
# 查看所有 ANTHROPIC 相关变量
Get-ChildItem Env: | Where-Object {$_.Name -like "*ANTHROPIC*"}
```

#### macOS/Linux

```bash
# 查看所有 ANTHROPIC 相关变量
env | grep ANTHROPIC
```

---

## 获取帮助

如果以上方法都无法解决您的问题，请：

- 查看[售前售后](/support/after-sales)联系客服
- 加入 Telegram 群组：https://t.me/+5giwURKjurNkMjU9
- 查看[常见问题 FAQ](/support/faq)

---

本文档持续更新中，如有新的疑难杂症欢迎反馈...
