### mdf server
为什么要自己写
更多的自主控制，实现复杂功能

#### 依赖
- webpack-dev-middleware、webpack-hot-middleware
- html generator
- server router
- sockjs
- hot-client-js

#### mdf-ui
编辑时，结合组件化，以可视化的方式创建页面，也融合可视化商城进来
node 起服务，提供配置页面
ws 通信，前端修改发到 server，同步更新文件系统
最终实现 ui 配置 code

#### 多协议支持
这个应该通过 node 服务来提供，开发环境协议切换没什么意义

#### serverless
提供 SCF 云函数编程能力
框架封装底层的触发器，容器，应用链路套件
这是一个比较好的业务能力升级场景
普通团队很难自己去落地


```javascript
// 获取复杂参数
const { devMiddleware, serverOpts } = bundler.setupDev(true);

const server = new Server({
  devMiddleware,
  serverOpts,
  onListening: function (ret: any) {
    serverOpts.after();
  },
});

server.start();
```