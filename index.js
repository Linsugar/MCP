#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 数据存储路径
const shuJuLuJing = path.join(__dirname, 'xiaoshuo-shuju');

/**
 * 初始化数据目录
 * 创建必要的文件夹结构
 */
async function chuShiHuaShuJuMuLu() {
  try {
    await fs.mkdir(shuJuLuJing, { recursive: true });
    await fs.mkdir(path.join(shuJuLuJing, 'renwu'), { recursive: true });
    await fs.mkdir(path.join(shuJuLuJing, 'zhangjie'), { recursive: true });
    await fs.mkdir(path.join(shuJuLuJing, 'shijieguan'), { recursive: true });
    await fs.mkdir(path.join(shuJuLuJing, 'juqing'), { recursive: true });
  } catch (cuoWu) {
    console.error('初始化数据目录失败:', cuoWu);
  }
}

const server = new Server(
  {
    name: 'xiaoshuo-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {}
    },
  }
);


// 工具列表处理
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'chuangJianRenWu',
        description: '创建新的小说人物，包含姓名、性格、背景等信息',
        inputSchema: {
          type: 'object',
          properties: {
            mingZi: { type: 'string', description: '人物姓名' },
            xingGe: { type: 'string', description: '性格特点' },
            beiJing: { type: 'string', description: '人物背景故事' },
            waiMao: { type: 'string', description: '外貌描述' },
            guanXi: { type: 'string', description: '与其他人物的关系' }
          },
          required: ['mingZi']
        }
      },
      {
        name: 'huoQuRenWu',
        description: '获取指定人物的详细信息',
        inputSchema: {
          type: 'object',
          properties: {
            mingZi: { type: 'string', description: '人物姓名' }
          },
          required: ['mingZi']
        }
      },
      {
        name: 'lieJuRenWu',
        description: '列出所有已创建的人物',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'chuangJianZhangJie',
        description: '创建新章节，记录章节内容和大纲',
        inputSchema: {
          type: 'object',
          properties: {
            zhangJieHao: { type: 'number', description: '章节号' },
            biaoTi: { type: 'string', description: '章节标题' },
            daGang: { type: 'string', description: '章节大纲' },
            neiRong: { type: 'string', description: '章节内容' },
            sheJiRenWu: { type: 'array', items: { type: 'string' }, description: '涉及的人物' }
          },
          required: ['zhangJieHao', 'biaoTi']
        }
      },
      {
        name: 'huoQuZhangJie',
        description: '获取指定章节的内容',
        inputSchema: {
          type: 'object',
          properties: {
            zhangJieHao: { type: 'number', description: '章节号' }
          },
          required: ['zhangJieHao']
        }
      },
      {
        name: 'lieJuZhangJie',
        description: '列出所有章节概览',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'sheZhiShiJieGuan',
        description: '设置或更新世界观设定',
        inputSchema: {
          type: 'object',
          properties: {
            leiXing: { type: 'string', description: '设定类型（如：魔法体系、地理、历史等）' },
            neiRong: { type: 'string', description: '详细设定内容' }
          },
          required: ['leiXing', 'neiRong']
        }
      },
      {
        name: 'huoQuShiJieGuan',
        description: '获取世界观设定',
        inputSchema: {
          type: 'object',
          properties: {
            leiXing: { type: 'string', description: '设定类型' }
          }
        }
      },
      {
        name: 'tianJiaJuQingXian',
        description: '添加剧情线索，追踪故事发展',
        inputSchema: {
          type: 'object',
          properties: {
            mingCheng: { type: 'string', description: '剧情线名称' },
            miaoShu: { type: 'string', description: '剧情描述' },
            zhuangTai: { type: 'string', description: '状态（进行中/已完结/伏笔）' },
            xiangGuanZhangJie: { type: 'array', items: { type: 'number' }, description: '相关章节' }
          },
          required: ['mingCheng', 'miaoShu']
        }
      },
      {
        name: 'huoQuJuQingXian',
        description: '获取所有剧情线索',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'kuoZhanLingGan',
        description: '基于现有内容生成创作灵感和建议',
        inputSchema: {
          type: 'object',
          properties: {
            leiXing: { type: 'string', description: '灵感类型（人物发展/情节转折/冲突设计/场景描写）' },
            shangXiaWen: { type: 'string', description: '当前创作上下文' }
          },
          required: ['leiXing']
        }
      }
    ]
  };
});


// 工具调用处理
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case 'chuangJianRenWu': {
        const wenJianMing = `${args.mingZi}.json`;
        const wenJianLuJing = path.join(shuJuLuJing, 'renwu', wenJianMing);
        const renWuShuJu = {
          mingZi: args.mingZi,
          xingGe: args.xingGe || '',
          beiJing: args.beiJing || '',
          waiMao: args.waiMao || '',
          guanXi: args.guanXi || '',
          chuangJianShiJian: new Date().toISOString()
        };
        await fs.writeFile(wenJianLuJing, JSON.stringify(renWuShuJu, null, 2), 'utf-8');
        return {
          content: [{ type: 'text', text: `人物 "${args.mingZi}" 创建成功！` }]
        };
      }

      case 'huoQuRenWu': {
        const wenJianLuJing = path.join(shuJuLuJing, 'renwu', `${args.mingZi}.json`);
        const neiRong = await fs.readFile(wenJianLuJing, 'utf-8');
        return {
          content: [{ type: 'text', text: neiRong }]
        };
      }

      case 'lieJuRenWu': {
        const wenJianLieBiao = await fs.readdir(path.join(shuJuLuJing, 'renwu'));
        const renWuLieBiao = wenJianLieBiao
          .filter(f => f.endsWith('.json'))
          .map(f => f.replace('.json', ''));
        return {
          content: [{ type: 'text', text: `已创建的人物：\n${renWuLieBiao.join('\n')}` }]
        };
      }

      case 'chuangJianZhangJie': {
        const wenJianMing = `zhangjie-${args.zhangJieHao}.json`;
        const wenJianLuJing = path.join(shuJuLuJing, 'zhangjie', wenJianMing);
        const zhangJieShuJu = {
          zhangJieHao: args.zhangJieHao,
          biaoTi: args.biaoTi,
          daGang: args.daGang || '',
          neiRong: args.neiRong || '',
          sheJiRenWu: args.sheJiRenWu || [],
          chuangJianShiJian: new Date().toISOString()
        };
        await fs.writeFile(wenJianLuJing, JSON.stringify(zhangJieShuJu, null, 2), 'utf-8');
        return {
          content: [{ type: 'text', text: `第 ${args.zhangJieHao} 章 "${args.biaoTi}" 创建成功！` }]
        };
      }

      case 'huoQuZhangJie': {
        const wenJianLuJing = path.join(shuJuLuJing, 'zhangjie', `zhangjie-${args.zhangJieHao}.json`);
        const neiRong = await fs.readFile(wenJianLuJing, 'utf-8');
        return {
          content: [{ type: 'text', text: neiRong }]
        };
      }

      case 'lieJuZhangJie': {
        const wenJianLieBiao = await fs.readdir(path.join(shuJuLuJing, 'zhangjie'));
        const zhangJieLieBiao = [];
        for (const wenJian of wenJianLieBiao.filter(f => f.endsWith('.json'))) {
          const neiRong = await fs.readFile(path.join(shuJuLuJing, 'zhangjie', wenJian), 'utf-8');
          const shuJu = JSON.parse(neiRong);
          zhangJieLieBiao.push(`第${shuJu.zhangJieHao}章: ${shuJu.biaoTi}`);
        }
        return {
          content: [{ type: 'text', text: `章节列表：\n${zhangJieLieBiao.join('\n')}` }]
        };
      }

      case 'sheZhiShiJieGuan': {
        const wenJianMing = `${args.leiXing}.json`;
        const wenJianLuJing = path.join(shuJuLuJing, 'shijieguan', wenJianMing);
        const shiJieGuanShuJu = {
          leiXing: args.leiXing,
          neiRong: args.neiRong,
          gengXinShiJian: new Date().toISOString()
        };
        await fs.writeFile(wenJianLuJing, JSON.stringify(shiJieGuanShuJu, null, 2), 'utf-8');
        return {
          content: [{ type: 'text', text: `世界观设定 "${args.leiXing}" 已保存！` }]
        };
      }

      case 'huoQuShiJieGuan': {
        if (args.leiXing) {
          const wenJianLuJing = path.join(shuJuLuJing, 'shijieguan', `${args.leiXing}.json`);
          const neiRong = await fs.readFile(wenJianLuJing, 'utf-8');
          return {
            content: [{ type: 'text', text: neiRong }]
          };
        } else {
          const wenJianLieBiao = await fs.readdir(path.join(shuJuLuJing, 'shijieguan'));
          const leiXingLieBiao = wenJianLieBiao
            .filter(f => f.endsWith('.json'))
            .map(f => f.replace('.json', ''));
          return {
            content: [{ type: 'text', text: `世界观设定类型：\n${leiXingLieBiao.join('\n')}` }]
          };
        }
      }

      case 'tianJiaJuQingXian': {
        const wenJianMing = `${args.mingCheng}.json`;
        const wenJianLuJing = path.join(shuJuLuJing, 'juqing', wenJianMing);
        const juQingShuJu = {
          mingCheng: args.mingCheng,
          miaoShu: args.miaoShu,
          zhuangTai: args.zhuangTai || '进行中',
          xiangGuanZhangJie: args.xiangGuanZhangJie || [],
          chuangJianShiJian: new Date().toISOString()
        };
        await fs.writeFile(wenJianLuJing, JSON.stringify(juQingShuJu, null, 2), 'utf-8');
        return {
          content: [{ type: 'text', text: `剧情线 "${args.mingCheng}" 已添加！` }]
        };
      }

      case 'huoQuJuQingXian': {
        const wenJianLieBiao = await fs.readdir(path.join(shuJuLuJing, 'juqing'));
        const juQingLieBiao = [];
        for (const wenJian of wenJianLieBiao.filter(f => f.endsWith('.json'))) {
          const neiRong = await fs.readFile(path.join(shuJuLuJing, 'juqing', wenJian), 'utf-8');
          const shuJu = JSON.parse(neiRong);
          juQingLieBiao.push(`${shuJu.mingCheng} [${shuJu.zhuangTai}]: ${shuJu.miaoShu}`);
        }
        return {
          content: [{ type: 'text', text: `剧情线索：\n${juQingLieBiao.join('\n\n')}` }]
        };
      }

      case 'kuoZhanLingGan': {
        const lingGanJianYi = {
          '人物发展': [
            '考虑人物的内心冲突和成长弧线',
            '设计人物关系的变化和发展',
            '探索人物的隐藏动机和秘密',
            '创造人物面临的道德困境'
          ],
          '情节转折': [
            '引入意外的外部事件',
            '揭示之前埋下的伏笔',
            '让配角做出关键决定',
            '改变主角的目标或信念'
          ],
          '冲突设计': [
            '人物之间的价值观冲突',
            '个人目标与集体利益的矛盾',
            '时间压力下的艰难选择',
            '过去与现在的碰撞'
          ],
          '场景描写': [
            '运用五感描写增强沉浸感',
            '通过环境烘托人物情绪',
            '设计具有象征意义的场景元素',
            '利用对比手法突出氛围'
          ]
        };
        
        const jianYi = lingGanJianYi[args.leiXing] || ['请指定有效的灵感类型'];
        let huiFu = `${args.leiXing}创作建议：\n\n`;
        jianYi.forEach((item, index) => {
          huiFu += `${index + 1}. ${item}\n`;
        });
        
        if (args.shangXiaWen) {
          huiFu += `\n基于你的上下文："${args.shangXiaWen}"\n`;
          huiFu += `建议重点关注人物动机和情节推进的自然性。`;
        }
        
        return {
          content: [{ type: 'text', text: huiFu }]
        };
      }

      default:
        throw new Error(`未知工具: ${name}`);
    }
  } catch (cuoWu) {
    console.error('工具调用错误:', cuoWu);
    return {
      content: [{ type: 'text', text: `错误: ${cuoWu.message}` }],
      isError: true
    };
  }
});


// 资源列表处理
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'xiaoshuo://renwu/all',
        name: '所有人物',
        mimeType: 'application/json',
        description: '查看所有已创建的小说人物'
      },
      {
        uri: 'xiaoshuo://zhangjie/all',
        name: '所有章节',
        mimeType: 'application/json',
        description: '查看所有章节概览'
      },
      {
        uri: 'xiaoshuo://shijieguan/all',
        name: '世界观设定',
        mimeType: 'application/json',
        description: '查看所有世界观设定'
      },
      {
        uri: 'xiaoshuo://juqing/all',
        name: '剧情线索',
        mimeType: 'application/json',
        description: '查看所有剧情线索'
      }
    ]
  };
});

// 资源读取处理
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  
  try {
    if (uri === 'xiaoshuo://renwu/all') {
      const wenJianLieBiao = await fs.readdir(path.join(shuJuLuJing, 'renwu'));
      const renWuShuJu = [];
      for (const wenJian of wenJianLieBiao.filter(f => f.endsWith('.json'))) {
        const neiRong = await fs.readFile(path.join(shuJuLuJing, 'renwu', wenJian), 'utf-8');
        renWuShuJu.push(JSON.parse(neiRong));
      }
      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(renWuShuJu, null, 2)
        }]
      };
    }
    
    if (uri === 'xiaoshuo://zhangjie/all') {
      const wenJianLieBiao = await fs.readdir(path.join(shuJuLuJing, 'zhangjie'));
      const zhangJieShuJu = [];
      for (const wenJian of wenJianLieBiao.filter(f => f.endsWith('.json'))) {
        const neiRong = await fs.readFile(path.join(shuJuLuJing, 'zhangjie', wenJian), 'utf-8');
        zhangJieShuJu.push(JSON.parse(neiRong));
      }
      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(zhangJieShuJu, null, 2)
        }]
      };
    }
    
    if (uri === 'xiaoshuo://shijieguan/all') {
      const wenJianLieBiao = await fs.readdir(path.join(shuJuLuJing, 'shijieguan'));
      const shiJieGuanShuJu = [];
      for (const wenJian of wenJianLieBiao.filter(f => f.endsWith('.json'))) {
        const neiRong = await fs.readFile(path.join(shuJuLuJing, 'shijieguan', wenJian), 'utf-8');
        shiJieGuanShuJu.push(JSON.parse(neiRong));
      }
      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(shiJieGuanShuJu, null, 2)
        }]
      };
    }
    
    if (uri === 'xiaoshuo://juqing/all') {
      const wenJianLieBiao = await fs.readdir(path.join(shuJuLuJing, 'juqing'));
      const juQingShuJu = [];
      for (const wenJian of wenJianLieBiao.filter(f => f.endsWith('.json'))) {
        const neiRong = await fs.readFile(path.join(shuJuLuJing, 'juqing', wenJian), 'utf-8');
        juQingShuJu.push(JSON.parse(neiRong));
      }
      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(juQingShuJu, null, 2)
        }]
      };
    }
    
    throw new Error('未知资源URI');
  } catch (cuoWu) {
    console.error('资源读取错误:', cuoWu);
    throw cuoWu;
  }
});

// 启动服务器
async function qiDong() {
  await chuShiHuaShuJuMuLu();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('小说写作 MCP 服务器已启动');
}

qiDong().catch(cuoWu => {
  console.error('服务器启动失败:', cuoWu);
  process.exit(1);
});
