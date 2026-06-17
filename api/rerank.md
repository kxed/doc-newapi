# 重排序

文档重排序接口，根据查询语句对候选文档进行相关性排序，常用于 RAG 流程优化检索结果。

## 创建重排序 POST

```
POST https://claude360.xyz/v1/rerank
```

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| model | string | ✅ | 重排序模型 |
| query | string | ✅ | 查询语句 |
| documents | array | ✅ | 候选文档列表 |
| top_n | integer | | 返回前 N 条结果 |
| return_documents | boolean | | 是否返回原文 |

### 示例请求

**cURL**

```bash
curl -X POST "https://claude360.xyz/v1/rerank" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-xxxx" \
  -d '{
    "model": "rerank-v1",
    "query": "什么是量子计算",
    "documents": [
      "量子计算利用量子力学原理进行计算",
      "经典计算机使用二进制位",
      "量子比特可以同时处于多个状态"
    ],
    "top_n": 2
  }'
```

**Python**

```python
import requests

response = requests.post(
    "https://claude360.xyz/v1/rerank",
    headers={"Authorization": "Bearer sk-xxxx"},
    json={
        "model": "rerank-v1",
        "query": "什么是量子计算",
        "documents": [
            "量子计算利用量子力学原理进行计算",
            "经典计算机使用二进制位",
            "量子比特可以同时处于多个状态"
        ],
        "top_n": 2
    }
)

print(response.json())
```

### 响应

```json
{
  "results": [
    {"index": 0, "relevance_score": 0.95},
    {"index": 2, "relevance_score": 0.82}
  ]
}
```
