# NanoBanana 图像生成部署指南

通过 Claude360 调用 Gemini 原生图像生成 API

| 资源 | 地址 |
| --- | --- |
| Claude360 平台 | claude360.xyz |

📋 简介

NanoBanana 是 Claude360 提供的 Gemini 图像生成模型系列。通过 Claude360 的 API Key 即可直接调用，无需科学上网，无需谷歌账号。

## 🎯 模型介绍

Claude360 提供两个 NanoBanana 模型：

| 模型 | 模型 ID | 特点 | 适用场景 |
| --- | --- | --- | --- |
| NanoBananaPro | `gemini-3-pro-image-preview` | 效果最佳，支持高清输出 | 高质量海报、商业素材、精细创作 |
| NanoBanana2 | `gemini-3.1-flash-image-preview` | 速度快、价格低 | 快速预览、批量生成、日常使用 |

💡 如何选择

- 追求画质：选 NanoBananaPro（Pro 版）
- 追求速度和性价比：选 NanoBanana2（Flash 版）

## 📐 支持的宽高比

两个模型均支持以下 10 种宽高比：

| 宽高比 | 说明 | 宽高比 | 说明 |
| --- | --- | --- | --- |
| 1:1 | 正方形图片 | 3:2 | 相机常用比例（横） |
| 16:9 | 横屏标准比例 | 2:3 | 相机常用比例（竖） |
| 9:16 | 竖屏标准比例 | 21:9 | 超宽屏比例 |
| 4:3 | 传统横屏比例 | 5:4 | 显示器比例（横） |
| 3:4 | 传统竖屏比例 | 4:5 | 显示器比例（竖） |

## 📏 支持的分辨率

每种宽高比支持三种分辨率等级：

### 1K 分辨率（快速预览）

| 宽高比 | 分辨率 | 宽高比 | 分辨率 |
| --- | --- | --- | --- |
| 1:1 | 1024x1024 | 3:2 | 1232x816 |
| 16:9 | 1376x768 | 2:3 | 816x1232 |
| 9:16 | 768x1376 | 21:9 | 1584x672 |
| 4:3 | 1200x896 | 5:4 | 1136x896 |
| 3:4 | 896x1200 | 4:5 | 896x1136 |

### 2K 分辨率（推荐使用）

| 宽高比 | 分辨率 | 宽高比 | 分辨率 |
| --- | --- | --- | --- |
| 1:1 | 2048x2048 | 3:2 | 2464x1632 |
| 16:9 | 2752x1536 | 2:3 | 1632x2464 |
| 9:16 | 1536x2752 | 21:9 | 3168x1344 |
| 4:3 | 2400x1792 | 5:4 | 2272x1792 |
| 3:4 | 1792x2400 | 4:5 | 1792x2272 |

### 4K 分辨率（超高清）

| 宽高比 | 分辨率 | 宽高比 | 分辨率 |
| --- | --- | --- | --- |
| 1:1 | 4096x4096 | 3:2 | 4928x3264 |
| 16:9 | 5504x3072 | 2:3 | 3264x4928 |
| 9:16 | 3072x5504 | 21:9 | 6336x2688 |
| 4:3 | 4800x3584 | 5:4 | 4544x3584 |
| 3:4 | 3584x4800 | 4:5 | 3584x4544 |

## 🔧 API 请求格式

NanoBanana 使用谷歌原生格式 API，与 OpenAI 格式不同。

### 基本请求结构

```json
{
  "contents": [{
    "parts": [
      { "text": "您的图片描述" }
    ]
  }],
  "generationConfig": {
    "responseModalities": ["IMAGE"],
    "imageConfig": {
      "aspectRatio": "16:9",
      "image_size": "2K"
    }
  }
}
```

### 参数说明

| 参数 | 说明 | 可选值 |
| --- | --- | --- |
| `responseModalities` | 响应类型，必须设为图片 | `["IMAGE"]` |
| `aspectRatio` | 宽高比 | `1:1`、`16:9`、`9:16`、`4:3`、`3:4`、`3:2`、`2:3`、`21:9`、`5:4`、`4:5` |
| `image_size` | 分辨率等级 | `1K`、`2K`、`4K` |

### API 端点

```
POST https://claude360.xyz/v1beta/models/{模型ID}:generateContent
```

- NanoBananaPro：`gemini-3-pro-image-preview`
- NanoBanana2：`gemini-3.1-flash-image-preview`

## 📝 示例代码

### cURL 示例

```bash
curl -X POST "https://claude360.xyz/v1beta/models/gemini-3-pro-image-preview:generateContent" \
  -H "Authorization: Bearer sk-你的Claude360密钥" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [
        {"text": "一只可爱的小猫咪坐在花园里，油画风格，高清，细节丰富"}
      ]
    }],
    "generationConfig": {
      "responseModalities": ["IMAGE"],
      "imageConfig": {
        "aspectRatio": "16:9",
        "image_size": "2K"
      }
    }
  }'
```

### Python 示例

```python
import requests
import base64

API_KEY = "sk-你的Claude360密钥"
API_URL = "https://claude360.xyz/v1beta/models/gemini-3-pro-image-preview:generateContent"

payload = {
    "contents": [{
        "parts": [
            {"text": "一只可爱的小猫咪坐在花园里，油画风格，高清，细节丰富"}
        ]
    }],
    "generationConfig": {
        "responseModalities": ["IMAGE"],
        "imageConfig": {
            "aspectRatio": "16:9",
            "image_size": "2K"
        }
    }
}

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

response = requests.post(API_URL, headers=headers, json=payload, timeout=600)

if response.status_code == 200:
    data = response.json()
    image_base64 = data["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]

    # 保存图片
    with open("output.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
    print("图片已保存为 output.png")
else:
    print(f"请求失败: {response.status_code}")
    print(response.text)
```

### Node.js 示例

```javascript
const fs = require('fs');

const API_KEY = 'sk-你的Claude360密钥';
const API_URL = 'https://claude360.xyz/v1beta/models/gemini-3-pro-image-preview:generateContent';

async function generateImage() {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: '一只可爱的小猫咪坐在花园里，油画风格，高清，细节丰富' }
        ]
      }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: {
          aspectRatio: '16:9',
          image_size: '2K'
        }
      }
    })
  });

  const data = await response.json();
  const imageBase64 = data.candidates[0].content.parts[0].inlineData.data;

  fs.writeFileSync('output.png', Buffer.from(imageBase64, 'base64'));
  console.log('图片已保存为 output.png');
}

generateImage().catch(console.error);
```

## 🖼️ 图生图编辑

NanoBananaPro 还支持图生图功能，上传一张图片并描述编辑指令，即可对图片进行修改。

```json
{
  "contents": [{
    "parts": [
      {
        "inlineData": {
          "mimeType": "image/png",
          "data": "图片的Base64编码字符串"
        }
      },
      { "text": "将背景改为星空，保持人物不变" }
    ]
  }],
  "generationConfig": {
    "responseModalities": ["IMAGE"],
    "imageConfig": {
      "aspectRatio": "16:9",
      "image_size": "2K"
    }
  }
}
```

💡 图生图使用技巧

- 编辑指令要具体明确，说清楚保留什么、修改什么
- 支持换背景、改风格、加元素、去水印等操作
- 图片需要转为 Base64 编码后放入`inlineData.data`字段

## ⏱️ 性能建议

### 推荐超时时间

不同分辨率的处理时间差异较大，建议设置合理的超时：

| 分辨率 | 推荐超时 | 适用场景 |
| --- | --- | --- |
| 1K | 360 秒（6 分钟） | 快速预览、测试效果 |
| 2K | 600 秒（10 分钟） | 日常使用（推荐） |
| 4K | 1200 秒（20 分钟） | 超高清输出、商业用途 |

### 带宽注意

图片数据使用 Base64 编码传输，数据量较大：

- 建议使用稳定高速的网络连接
- 4K 图片的 Base64 数据可能超过 10MB
- 避免在网络高峰时段生成 4K 图片

## ⚠️ 注意事项

1. API Key：需从 Claude360 平台创建支持图像模型的令牌
2. API 格式：NanoBanana 使用谷歌原生格式，不是 OpenAI 兼容格式，请注意区分
3. 分辨率与耗时：分辨率越高，生成时间越长，请根据实际需求选择
4. 文字渲染：支持在图片中渲染中文文字（如招牌、海报文案），在 prompt 中直接写明即可
5. 价格差异：不同模型和分辨率价格不同，详见 Claude360 平台定价页面
