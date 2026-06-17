# 审查

内容安全审核接口，检测文本是否包含不安全内容。

## 创建审查 POST

```
POST https://claude360.xyz/v1/moderations
```

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| model | string | | 审查模型，默认`text-moderation-latest` |
| input | string/array | ✅ | 待审查的文本 |

### 示例请求

**cURL**

```bash
curl -X POST "https://claude360.xyz/v1/moderations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-xxxx" \
  -d '{
    "input": "这是一段需要审查的文本内容。"
  }'
```

**Python**

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-xxxx",
    base_url="https://claude360.xyz/v1"
)

response = client.moderations.create(
    input="这是一段需要审查的文本内容。"
)

print(response.results[0].flagged)
```

### 响应

```json
{
  "id": "modr-abc123",
  "model": "text-moderation-latest",
  "results": [
    {
      "flagged": false,
      "categories": {
        "sexual": false,
        "hate": false,
        "harassment": false,
        "self-harm": false,
        "violence": false
      },
      "category_scores": {
        "sexual": 0.0001,
        "hate": 0.0002,
        "harassment": 0.0001,
        "self-harm": 0.0000,
        "violence": 0.0001
      }
    }
  ]
}
```
