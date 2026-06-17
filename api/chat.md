# 聊天

对话补全接口，最常用的 AI 对话接口，兼容 OpenAI Chat Completions API。

## 创建聊天完成 POST

```
POST https://claude360.xyz/v1/chat/completions
```

### Authorization

| 参数 | 位置 | 说明 |
| --- | --- | --- |
| Authorization | Header | `Bearer sk-xxxx` |
| Content-Type | Header | `application/json` |

### 请求参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| model | string | ✅ | - | 模型名称，如`claude-sonnet-4-20250514` |
| messages | array | ✅ | - | 对话消息列表 |
| temperature | number | | 1.0 | 采样温度，0~2 |
| top_p | number | | 1.0 | 核采样参数，0~1 |
| max_tokens | integer | | 4096 | 最大生成 token 数 |
| stream | boolean | | false | 是否流式输出 |
| presence_penalty | number | | 0 | 存在惩罚，-2.0~2.0 |
| frequency_penalty | number | | 0 | 频率惩罚，-2.0~2.0 |
| stop | array/string | | null | 停止序列 |
| tools | array | | null | 工具/函数调用定义 |
| tool_choice | string/object | | "auto" | 工具选择策略 |

### messages 结构

支持的 role 类型：

- system — 系统提示，设定 AI 角色和行为
- user — 用户输入
- assistant — 模型回复（多轮对话上下文）
- tool — 工具调用返回结果

多模态内容（部分模型支持）：

```json
[
  {"type": "text", "text": "请描述这张图片"},
  {"type": "image_url", "image_url": {"url": "https://example.com/image.jpg"}}
]
```

### 示例请求

**cURL**

```bash
curl -X POST "https://claude360.xyz/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-xxxx" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "messages": [
      {"role": "system", "content": "你是一个有帮助的AI助手。"},
      {"role": "user", "content": "你好，请介绍一下自己。"}
    ],
    "temperature": 0.7,
    "max_tokens": 1024,
    "stream": false
  }'
```

**JavaScript**

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'sk-xxxx',
  baseURL: 'https://claude360.xyz/v1',
});

const response = await client.chat.completions.create({
  model: 'claude-sonnet-4-20250514',
  messages: [
    { role: 'system', content: '你是一个有帮助的AI助手。' },
    { role: 'user', content: '你好，请介绍一下自己。' },
  ],
  temperature: 0.7,
  max_tokens: 1024,
});

console.log(response.choices[0].message.content);
```

**Python**

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-xxxx",
    base_url="https://claude360.xyz/v1"
)

response = client.chat.completions.create(
    model="claude-sonnet-4-20250514",
    messages=[
        {"role": "system", "content": "你是一个有帮助的AI助手。"},
        {"role": "user", "content": "你好，请介绍一下自己。"}
    ],
    temperature=0.7,
    max_tokens=1024
)

print(response.choices[0].message.content)
```

**Go**

```go
package main

import (
    "context"
    "fmt"
    "github.com/sashabaranov/go-openai"
)

func main() {
    config := openai.DefaultConfig("sk-xxxx")
    config.BaseURL = "https://claude360.xyz/v1"
    client := openai.NewClientWithConfig(config)

    resp, _ := client.CreateChatCompletion(
        context.Background(),
        openai.ChatCompletionRequest{
            Model: "claude-sonnet-4-20250514",
            Messages: []openai.ChatCompletionMessage{
                {Role: "system", Content: "你是一个有帮助的AI助手。"},
                {Role: "user", Content: "你好，请介绍一下自己。"},
            },
            Temperature: 0.7,
            MaxTokens:   1024,
        },
    )
    fmt.Println(resp.Choices[0].Message.Content)
}
```

**Java**

```java
import com.theokanning.openai.completion.chat.*;
import com.theokanning.openai.service.OpenAiService;
import java.util.List;

OpenAiService service = new OpenAiService("sk-xxxx",
    "https://claude360.xyz/v1");

ChatCompletionRequest request = ChatCompletionRequest.builder()
    .model("claude-sonnet-4-20250514")
    .messages(List.of(
        new ChatMessage("system", "你是一个有帮助的AI助手。"),
        new ChatMessage("user", "你好，请介绍一下自己。")
    ))
    .temperature(0.7)
    .maxTokens(1024)
    .build();

ChatCompletionResult result = service.createChatCompletion(request);
System.out.println(result.getChoices().get(0).getMessage().getContent());
```

**C#**

```csharp
using OpenAI;
using OpenAI.Chat;

var client = new ChatClient(
    model: "claude-sonnet-4-20250514",
    apiKey: "sk-xxxx",
    options: new OpenAIClientOptions {
        Endpoint = new Uri("https://claude360.xyz/v1")
    });

var response = await client.CompleteChatAsync(new List<ChatMessage>
{
    new SystemChatMessage("你是一个有帮助的AI助手。"),
    new UserChatMessage("你好，请介绍一下自己。")
});

Console.WriteLine(response.Value.Content[0].Text);
```

### 响应（非流式）

**200 成功**

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1677858242,
  "model": "claude-sonnet-4-20250514",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "你好！我是一个AI助手，很高兴为你服务。"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 28,
    "completion_tokens": 18,
    "total_tokens": 46
  }
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

### 流式响应（stream=true）

采用 Server-Sent Events (SSE) 格式：

```
data: {"id":"chatcmpl-123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"role":"assistant","content":"你"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"好"},"finish_reason":null}]}

data: [DONE]
```
