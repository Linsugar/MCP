# 小说写作辅助 MCP 服务器

这是一个专门为小说创作设计的 MCP (Model Context Protocol) 服务器，帮助你管理人物、章节、世界观和剧情线索。

## 功能特性

### 1. 人物管理
- 创建和管理小说人物
- 记录人物性格、背景、外貌、关系
- 快速查询人物信息

### 2. 章节管理
- 按章节组织小说内容
- 记录章节大纲和正文
- 追踪每章涉及的人物

### 3. 世界观设定
- 保存各类世界观设定（魔法体系、地理、历史等）
- 分类管理不同类型的设定
- 随时查阅和更新

### 4. 剧情线索
- 追踪多条剧情线的发展
- 标记剧情状态（进行中/已完结/伏笔）
- 关联相关章节

### 5. 灵感扩展
- 提供创作建议和灵感
- 支持人物发展、情节转折、冲突设计、场景描写等多个维度

## 安装步骤

1. 确保已安装 Node.js (版本 18 或更高)

2. 进入项目目录并安装依赖：
```bash
cd xiaoshuo-mcp
npm install
```

3. 配置 Kiro MCP

在 `.kiro/settings/mcp.json` 中添加：

```json
{
  "mcpServers": {
    "xiaoshuo": {
      "command": "node",
      "args": ["你的路径/xiaoshuo-mcp/index.js"],
      "disabled": false
    }
  }
}
```

## 使用示例

### 创建人物
```
使用 chuangJianRenWu 工具：
- mingZi: "张三"
- xingGe: "勇敢、正直、有时冲动"
- beiJing: "出身武林世家，自幼习武"
- waiMao: "身材高大，剑眉星目"
```

### 创建章节
```
使用 chuangJianZhangJie 工具：
- zhangJieHao: 1
- biaoTi: "初入江湖"
- daGang: "主角离开家乡，第一次踏入江湖"
- neiRong: "章节正文内容..."
- sheJiRenWu: ["张三", "李四"]
```

### 设置世界观
```
使用 sheZhiShiJieGuan 工具：
- leiXing: "魔法体系"
- neiRong: "本世界的魔法分为五大元素..."
```

### 添加剧情线
```
使用 tianJiaJuQingXian 工具：
- mingCheng: "寻找神器"
- miaoShu: "主角寻找传说中的神器以对抗邪恶势力"
- zhuangTai: "进行中"
- xiangGuanZhangJie: [1, 3, 5]
```

### 获取创作灵感
```
使用 kuoZhanLingGan 工具：
- leiXing: "情节转折"
- shangXiaWen: "主角刚刚获得了一个重要线索"
```

## 数据存储

所有数据保存在 `xiaoshuo-mcp/xiaoshuo-shuju/` 目录下：
- `renwu/` - 人物信息
- `zhangjie/` - 章节内容
- `shijieguan/` - 世界观设定
- `juqing/` - 剧情线索

数据以 JSON 格式存储，方便备份和迁移。

## 可用工具列表

1. `chuangJianRenWu` - 创建新人物
2. `huoQuRenWu` - 获取人物信息
3. `lieJuRenWu` - 列出所有人物
4. `chuangJianZhangJie` - 创建新章节
5. `huoQuZhangJie` - 获取章节内容
6. `lieJuZhangJie` - 列出所有章节
7. `sheZhiShiJieGuan` - 设置世界观
8. `huoQuShiJieGuan` - 获取世界观设定
9. `tianJiaJuQingXian` - 添加剧情线
10. `huoQuJuQingXian` - 获取所有剧情线
11. `kuoZhanLingGan` - 获取创作灵感

## 注意事项

- 所有数据本地存储，注意定期备份
- 人物名称和章节号作为唯一标识，不要重复
- 建议按顺序创建章节，便于管理

## ⚠️ 重要:写作规范

**在使用AI写作前,请务必阅读 `xiaoshuo-shuju/写作规范.md`**

### 核心要求:
1. **写新章节前必须先读取前3章内容**,确保逻辑连贯
2. **严格遵守800章大纲**,不要跳跃或提前写后面的情节  
3. **去除AI味**:避免"深吸一口气"、"眼中闪过"等套话
4. **对话生活化**:用口语、语气词,不同人物说话风格不同
5. **加入生活细节**:具体的食物、天气、小动作等
6. **逻辑一致性**:时间、地点、人物状态、身份要前后一致

详细规范请查看: `xiaoshuo-shuju/写作规范.md`

祝你创作愉快！📖✨
