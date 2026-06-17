# Suno 音乐生成

通过 Suno 模型生成 AI 音乐。每次调用会生成 **2 首** 不同的歌曲，支持自定义歌词、曲风、人声性别、模型版本等全量参数。

## 核心特性

- **两步异步**：先提交任务拿到 `task_id`，再轮询获取结果（音乐生成需 1～3 分钟）
- **一次出 2 首**：每次提交返回 2 个不同的音乐版本供挑选
- **全量自定义**：曲风、歌词、人声性别、风格权重、负向标签、模型版本（含 V5.5）等

## 认证

所有请求通过 HTTP Header 携带你的令牌（API Key）：

```
Authorization: Bearer sk-xxxxxxxxxxxxxxxx
```

接口基址：`https://claude360.xyz`

## 快速开始

最简单的方式——只给一句描述，模型自动作词作曲：

```bash
# 1) 提交任务
curl -X POST https://claude360.xyz/suno/submit/music \
  -H "Authorization: Bearer sk-xxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "一首轻快的城市夜晚电子乐",
    "model": "V4_5"
  }'
# 返回: {"code":"success","data":"task_abc123..."}

# 2) 用返回的 task_id 轮询结果
curl -X POST https://claude360.xyz/suno/fetch \
  -H "Authorization: Bearer sk-xxxx" \
  -H "Content-Type: application/json" \
  -d '{"ids":["task_abc123..."]}'
# status 由 IN_PROGRESS 变为 SUCCESS 后，data 中即含 2 首歌的 audio_url
```

## 接口一：提交任务

```
POST https://claude360.xyz/suno/submit/music
```

### 基础参数

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `prompt` | string | 是 | 非自定义模式：音乐的创意描述（AI 自动作词）。自定义模式：直接作为**歌词**演唱 |
| `model` | string | 否 | 模型版本，见下方[模型版本](#模型版本)；缺省默认 `V4_5` |
| `custom_mode` | bool | 否 | 是否开启自定义模式（默认 `false`）。开启后可精确控制曲风、标题、歌词 |
| `instrumental` | bool | 否 | 是否生成纯器乐（无人声），默认 `false` |
| `title` | string | 否 | 歌曲标题（自定义模式下建议填写）|
| `style` | string | 否 | 曲风/风格描述，如 `"Jazz"`、`"synthwave, female vocals"`（自定义模式必填）|

### 高级参数（自定义参数）

| 参数 | 类型 | 取值 | 说明 |
|---|---|---|---|
| `vocal_gender` | string | `m` / `f` | 人声性别（男/女）。仅 V4.5 及以上模型生效 |
| `style_weight` | number | 0.00–1.00 | 风格遵循强度。越高越贴合 `style` 描述 |
| `weirdness_constraint` | number | 0.00–1.00 | 创意/新奇程度。越高越大胆 |
| `audio_weight` | number | 0.00–1.00 | 输入音频影响权重（用于参考音频场景）|
| `negative_tags` | string | - | 要**排除**的曲风/特征，如 `"Heavy Metal, Upbeat Drums"` |
| `persona_id` | string | - | 角色音色 ID（Persona / Suno Voice 生成的 ID）|
| `persona_model` | string | `style_persona` / `voice_persona` | 角色类型。`voice_persona` 仅 V5/V5.5 可用 |

::: tip 字段兼容
若你使用旧版字段也可正常工作：`mv`（等价 `model`）、`tags`（等价 `style`）、`make_instrumental`（等价 `instrumental`）。新字段优先级更高。
:::

### 两种模式

**非自定义模式（`custom_mode: false`，推荐新手）**

只需提供 `prompt`，模型自动生成歌词和旋律。`prompt` 限 500 字符。

```json
{
  "prompt": "a calm relaxing piano track with soft melodies",
  "model": "V4_5"
}
```

**自定义模式（`custom_mode: true`）**

精确控制创作。`prompt` 将被**当作歌词逐字演唱**，需同时提供 `style` 和 `title`。

```json
{
  "custom_mode": true,
  "instrumental": false,
  "model": "V5_5",
  "title": "Electric Nights",
  "style": "synthwave, retro electronic, female vocals",
  "prompt": "[Verse]\nNeon rivers flow through midnight streets\n[Chorus]\nWe are electric, we never sleep",
  "vocal_gender": "f",
  "style_weight": 0.7,
  "negative_tags": "heavy metal"
}
```

### 响应

```json
{
  "code": "success",
  "message": "submitted",
  "data": "task_24tm0sXrWNJdascOTX86241Lu0bHni4D"
}
```

`data` 即任务 ID（`task_id`），用于下一步查询。若 `code` 非 `success`，表示提交失败（如参数错误、余额不足），`message` 含原因。

## 接口二：查询结果

```
POST https://claude360.xyz/suno/fetch
```

支持一次查询多个任务。音乐生成约需 1～3 分钟，建议每 10～15 秒轮询一次，直到 `status` 变为 `SUCCESS` 或 `FAILURE`。

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `ids` | string[] | 是 | 任务 ID 列表（来自提交接口返回的 `data`）|

```json
{ "ids": ["task_24tm0sXrWNJdascOTX86241Lu0bHni4D"] }
```

### 响应（成功）

```json
{
  "code": "success",
  "data": [
    {
      "task_id": "task_24tm0sXrWNJdascOTX86241Lu0bHni4D",
      "action": "MUSIC",
      "status": "SUCCESS",
      "fail_reason": "",
      "finish_time": 1781683354,
      "data": [
        {
          "id": "826b829e-20f8-4148-afe3-e6aa7f67d069",
          "audio_url": "https://.../xxxx.mp3",
          "image_url": "https://.../xxxx.jpeg",
          "model_name": "chirp-fenix",
          "title": "Electric Nights",
          "text": "[Verse]\nNeon rivers flow through midnight streets...",
          "status": "complete",
          "metadata": { "tags": "synthwave, female vocals", "duration": 42.12 }
        },
        {
          "id": "b0558517-edcc-49c0-b047-046b698d1665",
          "audio_url": "https://.../yyyy.mp3",
          "model_name": "chirp-fenix",
          "title": "Electric Nights",
          "metadata": { "duration": 59.92 }
        }
      ]
    }
  ]
}
```

### 任务状态（`status`）

| 状态 | 含义 |
|---|---|
| `IN_PROGRESS` | 生成中（含排队、文本生成、首曲完成等中间态），继续轮询 |
| `SUCCESS` | 全部完成，`data` 数组含 2 首歌 |
| `FAILURE` | 生成失败，原因见 `fail_reason` |

### 歌曲字段（`data[]`）

| 字段 | 说明 |
|---|---|
| `id` | 单首歌曲的唯一 ID（可用于续写）|
| `audio_url` | 音频文件地址（mp3）|
| `image_url` | 封面图地址 |
| `model_name` | 实际使用的模型代号（如 `chirp-fenix` = V5.5）|
| `title` | 歌曲标题 |
| `text` | 歌词文本 |
| `metadata.duration` | 时长（秒）|
| `metadata.tags` | 曲风标签 |

## 模型版本

`model` 字段可选值（请使用下划线写法，如 `V5_5`）：

| `model` | 实际模型代号 | 说明 |
|---|---|---|
| `V4` | chirp-v4 | 音质优秀，最长 4 分钟 |
| `V4_5` | chirp-auk | 曲风融合更佳，最长 8 分钟（默认）|
| `V4_5PLUS` | chirp-bluejay | 音色更丰富，最长 8 分钟 |
| `V4_5ALL` | - | 更好的歌曲结构，最长 8 分钟 |
| `V5` | chirp-crow | 更强的音乐表现力，生成更快 |
| `V5_5` | chirp-fenix | 最新版本，更具表现力的人声与定制能力 |

::: warning 写法注意
模型名用下划线，如 `V5_5`（不是 `V5.5`）。`prompt`/`style`/`title` 的字符上限随模型不同（V4 较低，V4.5+ 较高）。
:::

## 续写已有歌曲（可选）

在已生成歌曲的基础上延长创作：在请求中提供 `continue_clip_id`（来源歌曲的 `id`）和 `continue_at`（从第几秒开始续写）。

```json
{
  "continue_clip_id": "826b829e-20f8-4148-afe3-e6aa7f67d069",
  "continue_at": 60,
  "prompt": "继续这段旋律，加入更激昂的副歌",
  "model": "V5_5"
}
```

> 续写使用的模型版本需与源歌曲一致。

## 计费说明

- **按次计费**：一次提交（出 2 首）**只扣一次**费用，不随歌曲数量翻倍。
- 提交成功即预扣；若任务最终 `FAILURE`，系统会**自动全额退款**。
- 具体单价以你的账户分组/套餐为准。

## 注意事项

1. **音频链接有时效**：返回的 `audio_url` 由上游托管，**约保留 15 天**后失效。如需长期保存，请在生成后**及时下载/转存**到你自己的存储。
2. **无需回调地址**：本接口采用轮询模式，你无需提供 `callBackUrl`，系统会自动处理。
3. **轮询频率**：建议 10～15 秒一次。生成中途若只返回 1 首属正常（首曲先完成），待 `status=SUCCESS` 时即为完整 2 首。
4. **歌词标记**：自定义模式的 `prompt` 支持 `[Verse]`、`[Chorus]` 等结构标记，让演唱更符合歌曲结构。

## 错误码

| 状态码 | 含义 |
|---|---|
| `success` | 提交/查询成功 |
| `401` | 上游鉴权失败 |
| `413` | prompt/标题超长 |
| `429` | 余额不足 |
| `430` | 调用频率过高，请稍后重试 |
| `455` | 系统维护中 |
| `500` | 服务器错误 |
