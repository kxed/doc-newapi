# 补全

传统文本补全接口（Legacy Completions），适用于非对话式的文本生成场景。

## 创建补全 POST

```
POST https://claude360.xyz/v1/completions
```

### Authorization

| 参数 | 位置 | 说明 |
| --- | --- | --- |
| Authorization | Header | `Bearer sk-xxxx` |
| Content-Type | Header | `application/json` |

### 请求参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| model | string | ✅ | - | 模型名称 |
| prompt | string/array | ✅ | - | 提示文本 |
| max_tokens | integer | | 16 | 最大生成 token 数 |
| temperature | number | | 1.0 | 采样温度，0~2 |
| top_p | number | | 1.0 | 核采样参数 |
| stream | boolean | | false | 是否流式输出 |
| stop | array/string | | null | 停止序列 |
| suffix | string | | null | 补全后缀 |

### 示例请求

**cURL**

```bash
curl -X POST "https://claude360.xyz/v1/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-xxxx" \
  -d '{
    "model": "gpt-3.5-turbo-instruct",
    "prompt": "写一首关于春天的诗：",
    "max_tokens": 256,
    "temperature": 0.8
  }'
```

**Python**

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-xxxx",
    base_url="https://claude360.xyz/v1"
)

response = client.completions.create(
    model="gpt-3.5-turbo-instruct",
    prompt="写一首关于春天的诗：",
    max_tokens=256,
    temperature=0.8
)

print(response.choices[0].text)
```

**JavaScript**

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'sk-xxxx',
  baseURL: 'https://claude360.xyz/v1',
});

const response = await client.completions.create({
  model: 'gpt-3.5-turbo-instruct',
  prompt: '写一首关于春天的诗：',
  max_tokens: 256,
  temperature: 0.8,
});

console.log(response.choices[0].text);
```

### 响应

```json
{
  "id": "cmpl-abc123",
  "object": "text_completion",
  "created": 1677858242,
  "model": "gpt-3.5-turbo-instruct",
  "choices": [
    {
      "text": "\n春风拂面暖意浓，\n百花争艳满园红。",
      "index": 0,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 24,
    "total_tokens": 36
  }
}
```
