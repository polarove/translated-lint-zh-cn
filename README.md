## @translated-lint/zh-cn

> [!TIP]
> 全中文提交消息检查器
>
> 建议搭配 [@cz-translated-changelog/zh-cn](https://www.npmjs.com/package/@cz-translated-changelog/zh-cn) 使用

[![npm version](https://img.shields.io/npm/v/@translated-lint/zh-cn.svg?style=flat-square)](https://www.npmjs.com/package/@cz-translated-changelog/zh-cn) [![npm downloads](https://img.shields.io/npm/dm/@translated-lint/zh-cn.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@translated-lint/zh-cn&from=2024-03-16)

## 演示

![演示图片](https://raw.githubusercontent.com/polarove/cz-translated-changelog/master/assets/zh-cn/supervisor-demo.gif)

## 马上使用

安装依赖

```sh
npm i husky @cz-translated-changelog/zh-cn @translated-lint/zh-cn -D
```

初始化 husky

```sh
npm run husky
```

在项目根目录找到 `.husky` 文件夹，创建一个名为 `commit-msg` 的文件（没有后缀名），将下面的内容复制进去

```
#!/bin/bash

echo "[${0}]：正在检查提交消息"

npx tlzc --path ${1}
```

大功告成！

## 默认规则

从 `@cz-translated-changelog/zh-cn` 读取，

类型：["功能","修复","重构","发布","测试","文档","格式","优化","构建","ci","撤回","其他"] 中的一个即可

范围：[]

标题：最大长度 100 字符，必填

破坏性更新标记符号：`!`

详细内容：最大长度 100 字符

破坏性更新详细内容：以 `破坏性更新` 开头

issue 相关：以 ["功能","修复","重构","发布","测试","文档","格式","优化","构建","ci","撤回","其他"] 中的一个开头即可

## 自定义规则

根目录下创建一个 `tlzc-config.ts` 文件

```ts
import type { Config } from '@translated-lint/zh-cn'

// 根据类型提示编写规则即可
const config: Config = {}

// 默认导出
export default config
```
