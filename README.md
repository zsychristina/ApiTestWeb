## 安装指南

1. 首先安装  node  版本8以上即可; 确保 node -V
2. 安装 yarn 工具包  
```
npm install -g yarn
```
3. 设置淘宝源
```
yarn config set registry 'https://registry.npm.taobao.org'
npm config set registry 'https://registry.npm.taobao.org'
```
4. 删除工具
```
yarn global add rimraf
rimraf node_modules
```

### 安装依赖
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### 规则检查
```
yarn lint
```