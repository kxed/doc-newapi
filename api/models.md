# 模型列表

获取当前可用的模型列表。

## 列出模型 GET

```
GET https://claude360.xyz/v1/models
```

### Authorization

| 参数 | 位置 | 说明 |
| --- | --- | --- |
| Authorization | Header | `Bearer sk-xxxx` |

### 示例请求

**cURL**

```bash
curl -X GET "https://claude360.xyz/v1/models" \
  -H "Authorization: Bearer sk-xxxx"
```

**JavaScript**

```javascript
const response = await fetch('https://claude360.xyz/v1/models', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer sk-xxxx',
  },
});
const data = await response.json();
console.log(data);
```

**Python**

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-xxxx",
    base_url="https://claude360.xyz/v1"
)

models = client.models.list()
for model in models.data:
    print(model.id)
```

**Go**

```go
package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    req, _ := http.NewRequest("GET", "https://claude360.xyz/v1/models", nil)
    req.Header.Set("Authorization", "Bearer sk-xxxx")

    resp, _ := http.DefaultClient.Do(req)
    defer resp.Body.Close()
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}
```

### 响应

**200 成功**

```json
{
  "object": "list",
  "data": [
    {
      "id": "claude-sonnet-4-20250514",
      "object": "model",
      "created": 1700000000,
      "owned_by": "anthropic"
    },
    {
      "id": "gpt-4o",
      "object": "model",
      "created": 1700000000,
      "owned_by": "openai"
    }
  ]
}
```

**401 未授权**

```json
{
  "error": {
    "message": "Invalid API key",
    "type": "authentication_error",
    "code": "invalid_api_key"
  }
}
```
