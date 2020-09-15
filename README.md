<!--
 * @Author: shichuyu
 * @Date: 2020-03-11 17:29:49
 * @LastEditors: shichuyu
 * @LastEditTime: 2020-03-16 15:10:25
 * @Description: 
 -->
 
### 参考学习地址
初识webpack：https://mp.weixin.qq.com/s/OBUcxEFXKQQubP08LO2Uhg

进阶篇：https://mp.weixin.qq.com/s/9XGaw2TmGbGolNKM1eJ4wQ

优化篇：https://mp.weixin.qq.com/s/1BdKGW43MqWWsdQJ7MYI7w
 
### 深度解锁Webpack系列
#### 参考地址

https://mp.weixin.qq.com/s/OBUcxEFXKQQubP08LO2Uhg

#### 关于package.json 注释说明
由于加了注释老报错，所以在此处说明下
``` 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "set NODE_ENV=development && webpack",
    "build": "set NODE_ENV=production && webpack"
  },
  PS: 
    "dev": "NODE_ENV=development webpack", // 由于windows不支持 'NODE_ENV' 语法，加上set 和 && 
    "build"也同理
```

#### 关于webpack.config.js 的说明
1. devServer{
  - **quiet**：启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见 ———— 看不到错误日志，那还搞个egg？
}
