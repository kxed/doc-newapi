# 嵌入

文本嵌入向量生成接口，用于语义搜索、文本相似度计算、聚类等场景。

## 创建嵌入 POST

```
POST https://claude360.xyz/v1/embeddings
```

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| model | string | ✅ | 嵌入模型，如`text-embedding-3-small` |
| input | string/array | ✅ | 待嵌入的文本或文本数组 |
| encoding_format | string | | 返回格式：`float`或`base64` |
| dimensions | integer | | 输出维度（部分模型支持） |

### 示例请求

**cURL**

```bash
curl -X POST "https://claude360.xyz/v1/embeddings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-xxxx" \
  -d '{
    "model": "text-embedding-3-small",
    "input": "你好世界"
  }'
```

**Python**

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-xxxx",
    base_url="https://claude360.xyz/v1"
)

response = client.embeddings.create(
    model="text-embedding-3-small",
    input="你好世界"
)

print(response.data[0].embedding[:5])
```

**JavaScript**

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'sk-xxxx',
  baseURL: 'https://claude360.xyz/v1',
});

const response = await client.embeddings.create({
  model: 'text-embedding-3-small',
  input: '你好世界',
});

console.log(response.data[0].embedding.slice(0, 5));
```

### 响应

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [0.0023, -0.0094, 0.0156, 0.0283, -0.0045]
    }
  ],
  "model": "text-embedding-3-small",
  "usage": {
    "prompt_tokens": 4,
    "total_tokens": 4
  }
}
```
