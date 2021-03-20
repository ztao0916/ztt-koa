# ztt-koa
我的koa包,集成了ts,使用了装饰器的特性,mysql数据库,自动读取路由



### 中间件

首先理解一点: 中间件一定是一个函数,通过`app.use(xxx)`来调用中间件,`use`的顺序也会影响中间件的执行

#### log4js

这是日志中间件,做日志处理使用



### 路由

这里要实现自动读取路由的配置,需要用到装饰器

typescript的装饰器该怎么理解呢? 仔细思考中...

装饰器最为强大的功能之一是它能够反射元数据(reflect metadata)



### 支持eslint

参考路径: [eslint-tsc配置](https://github.com/AlloyTeam/eslint-config-alloy/blob/HEAD/README.zh-CN.md#typescript)

```js
npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-alloy
```

### 消除vscode配置的prettier影响

在package.json文件中增加配置

```js
//含义表示: 按eslint来格式化代码
"prettier": {
    "eslintIntegration": true,
    "semi": true
  }
```

