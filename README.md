# tampermonkey-cli [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

油猴脚本快速构建工具包。

## 功能
- 基于webpack打包单文件脚本
- 完全typescript开发与配置
- 动态热加载开发模式

## 快速开始

### 1. 安装tampermonkey-cli
```
npm install tampermonkey-cli -g
```

### 2. 创建脚本工程
```
tm create myscript
```
根据提示补充信息

### 3. 初始化脚本工程
```
cd myscript
npm install -save
```

### 4. 构建脚本
方式1：（构建结果为dist/index.user.js）
```
npm run build
```
方式2：（弹出浏览器安装界面）
```
npm run serve
```

## 配置
tampermonkey.config.ts


## 鸣谢
[webpack](https://github.com/webpack/webpack)

[webpack-userscript](https://github.com/momocow/webpack-userscript)

[lerna](https://github.com/lerna/lerna)