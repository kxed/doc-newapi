import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Claude360 使用文档',
  description: 'Claude360 AI 编程工具使用指南、环境安装、配置工具与部署说明',
  cleanUrls: true,
  themeConfig: {
    outline: { level: [2, 3], label: '本页目录' },
    nav: [
      { text: '首页', link: '/' },
      { text: '使用指南', link: '/guide/registration' },
      { text: 'Node 安装', link: '/node/windows' },
      { text: '配置工具', link: '/tools/cc-switch' },
      {
        text: '部署指南',
        items: [
          { text: 'Claude Code', link: '/deploy/claude-code' },
          { text: 'CodeX', link: '/deploy/codex' },
        ],
      },
      { text: '支持与 FAQ', link: '/support/faq' },
    ],
    sidebar: [
      {
        text: '快速开始',
        collapsed: false,
        items: [
          { text: '欢迎使用', link: '/intro/welcome' },
          { text: '中转站是什么', link: '/intro/overview' },
        ],
      },
      {
        text: '使用指南',
        collapsed: false,
        items: [
          { text: '注册账号', link: '/guide/registration' },
          { text: '创建专属 Key', link: '/guide/create-key' },
          { text: '修改令牌设置', link: '/guide/modify-token' },
          { text: '充值', link: '/guide/recharge' },
        ],
      },
      {
        text: 'AI 模型接口',
        collapsed: true,
        items: [
          { text: '接口详细设计 ↗', link: 'https://app.apifox.com/project/7865293' },
          { text: '模型', link: '/api/models' },
          { text: '聊天', link: '/api/chat' },
          { text: '补全', link: '/api/completions' },
          { text: '图像', link: '/api/images' },
          { text: '音频', link: '/api/audio' },
          { text: '嵌入', link: '/api/embeddings' },
          { text: '重排序', link: '/api/rerank' },
          { text: '审查', link: '/api/moderation' },
        ],
      },
      {
        text: 'Node.js 环境安装',
        collapsed: false,
        items: [
          { text: 'Windows 平台', link: '/node/windows' },
          { text: 'macOS 平台', link: '/node/macos' },
          { text: 'Linux 平台', link: '/node/linux' },
        ],
      },
      {
        text: '快速配置工具',
        collapsed: false,
        items: [
          { text: 'CC-Switch 配置工具', link: '/tools/cc-switch' },
          { text: 'Claude Code Hub', link: '/tools/claude-code-hub' },
        ],
      },
      {
        text: 'AI 编程工具部署',
        collapsed: false,
        items: [
          { text: 'Claude Code 部署', link: '/deploy/claude-code' },
          { text: 'CodeX 部署', link: '/deploy/codex' },
        ],
      },
      {
        text: '其他',
        collapsed: false,
        items: [
          { text: '进阶技巧', link: '/support/advanced' },
          { text: '疑难杂症', link: '/support/troubleshooting' },
          { text: '售前售后', link: '/support/after-sales' },
          { text: '常见问题', link: '/support/faq' },
        ],
      },
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换' },
          },
        },
      },
    },
    footer: {
      message: '和谐、友善、互助、开心',
      copyright: 'Copyright © 2025 Claude360',
    },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdatedText: '最后更新',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    socialLinks: [],
  },
})
