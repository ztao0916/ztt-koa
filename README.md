# 我的midway使用心得

记录自己`midway`使用过程中的问题与收获,官方文档:[传送门](https://www.yuque.com/midwayjs/midway_v2/koa)

### 文档内容

个人选择的是`koa`作为上层框架

```js
$ npm -v

# 如果是 npm v6
$ npm init midway --type=koa hello_koa

# 如果是 npm v7
$ npm init midway -- --type=koa hello_koa
```

 目录结构

```js
.
├── src
│   ├── controller								 		# controller 接口的地方
│   └── service									 		# service 逻辑处理的地方
│   └── middleware	                                    # 中间件目录
|   └── configuration.ts								# 入口及生命周期配置、组件管理
│   ├── config                                          # 应用配置文件夹
│   │   └── config.default.ts                           # 应用配置文件
│   ├── entity                                          # 实体（数据库 Model) 目录
│   │   └── photo.ts                                    # 实体文件
├── test                                                # 单元测试目录
├── package.json  
└── tsconfig.json
```

几个装饰器的含义

