# 我的midway使用心得

记录自己`midway`使用过程中的问题与收获,官方文档:[传送门](https://www.yuque.com/midwayjs/midway_v2/koa)

### 初始化

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
├── src
│   ├── controller	# controller 接口的地方,处理service获取的数据,返回给前台
│   └── service		# service 逻辑处理的地方,和数据库交互,返回数据
│   └── middleware	# 中间件目录
│   └── dto	# 参数校验
│   └── public	# 静态资源
│   ├── entity  #实体（数据库 Model) 目录
│   │   └── user.ts  #实体文件
│   ├── config  # 应用配置文件夹[egg独有]
│   │   └── config.default.ts # 应用配置文件
│   ├── entity  # 实体（数据库 Model) 目录
│   │   └── photo.ts # 实体文件
|   └── configuration.ts  # 入口及生命周期配置、组件管理
├── test # 单元测试目录
├── package.json  
└── tsconfig.json
```

几个装饰器的含义

| `@Param` | 取链接后面的斜杠分隔的数据,例如`www.baidu.com/a`, `param`是`{x:a}` |
| -------- | ------------------------------------------------------------ |
| `@Query` | 取链接后面问号分隔的数据,例如 `www.baidu.com?a=1`,`query`是`{a:1}` |
| `@Body`  | 正常的`post`请求,取`body`里面的数据                          |

部署

```js
生产上部署的时候需要先 npm run build

然后执行pm2 start bootstrap.js
```



### 中间件的使用

以`koa-static`为例(全局中间件)

```js
//在middleware文件夹下创建文件static.ts
import { Provide } from '@midwayjs/decorator';
import { join } from 'path';
import * as koaStatic from 'koa-static';
import { IWebMiddleware } from '@midwayjs/koa';

@Provide()
//staticMiddleware是中间件名称
export class staticMiddleware implements IWebMiddleware {
  resolve() {
    return koaStatic(join(__dirname, '../public'));
  }
}

//在configuration.ts文件里面新增
async onReady() {
    // bodyparser options see https://github.com/koajs/bodyparser
    this.app.use(bodyParser());
    //全局静态文件中间件
    this.app.use(await this.app.generateMiddleware('staticMiddleware'));//中间件名称
  }
```

定义中间件(控制器中间件和路由中间件)

```js
//report.ts
import { Provide } from '@midwayjs/decorator';
import {
  IWebMiddleware,
  IMidwayKoaContext,
  IMidwayKoaNext,
} from '@midwayjs/koa';

@Provide()
export class ReportMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: IMidwayKoaContext, next: IMidwayKoaNext) => {
      const startTime = Date.now();
      await next();
      console.log(`方法${ctx.method}响应时间${Date.now() - startTime}ms`);
    };
  }
}
//在api.ts中使用
import {
  Inject,
  Controller,
  Post,
  Provide,
  Body,
  Get,
  Query,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user';

@Provide()
//控制器中间件,只要执行控制器中的路由都执行该中间件
@Controller('/api', { middleware: ['reportMiddleware'] })
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;
  //路由中间件,只在执行当前路由的时候执行
  @Post('/get_user', { middleware: ['reportMiddleware'] })
  async postUser(@Body() uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/get_user')
  async getUser(@Query() uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
}
```

### 路由的编写

创建一个`controller/user.ts`文件

```js
//定义接口
export interface User {
  id: number;
  name: string;
  age: number;
}
```



```js
import {
  Controller,
  Get,
  Inject,
  Provide,
  Query,
  Post,
  Body,
  ALL,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { User } from '../interface';

@Provide()
@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Get('/')
  //get请求: 传递参数id,返回User类型的数据;如果id不传,就没id这个字段[可以做个非空校验,这样返回的字段一直是三个]
  async getUser(@Query() id: number): Promise<User> {
    console.log(this.ctx.query);
    return {
      id: id || 0,
      name: '娃哈哈',
      age: 18,
    };
  }

  @Post('/')
  //使用ALL获取ctx.request.body整个body对象
  async updateUser(@Body(ALL) user: User): Promise<User> {
    //post请求按照官方文档来,打印下面语句报错,会有个错误:类型Request上不存在属性body,需要安装@types/koa-bodyparser
    console.log(this.ctx.request.body);
    return user;
  }
}
```

### 数据库`mongodb`

数据库相关命令

```js
#步骤一: 登录
use admin
db.auth(用户名,密码) //要在对应的数据库
# 步骤二: 创建数据库
use midway //创建midway数据库
# 步骤三:授权
# 根权限
db.createUser({user:"user01",pwd:"123456",roles:[{role:"root",db:"admin"}]})
# 读写权限
db.createUser({user:"user01",pwd:"123456",roles:[{role:"readWrite",db:"stock"}]})
db.createUser({user:"midway",pwd:"midway_pwd_123456",roles:[{role:"readWrite",db:"midway"}]})
# 步骤四: 重启

# 常用操作
#获取所有用户,admin数据库下
db.system.users.find().pretty()
#当前库的用户
show users
#修改当前库下的用户密码
db.changeUserPassword('要更改的账户','重新更改的密码')
#删除用户
db.dropUser('要删除的账户')

```

安装插件

```js
npm i -s @midwayjs/typegoose @typegoose/typegoose 
npm i -s mongoose 
npm i -D @types/mongoose 													
```

引入

```js
// configuration.ts配置
import * as typegoose from '@midwayjs/typegoose';

imports: [typegoose]

//config.default.ts配置
import * as typegoose from '@midwayjs/typegoose';

export const mongoose: typegoose.DefaultConfig = {
  uri: 'mongodb+srv://cluster0.hy9wo.mongodb.net/',
  options: { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: '***********',
    user: '***********', 
    pass: '***********' 
  }
}
```

大致的书写逻辑

```js
# 首先: entity文件夹 定义一个文档模型,相当于mongoose.schema

# 然后: service文件夹里面执行文档的CRUD,同时返回操作结果

# 最后: controller文件夹里面执行数据操作[进行字段的校验,必填之类的]
```



### 加载公共配置

安装`jsonwebtoken`,`koa-jwt`,`@types/jsonwebtoken`

设置`secretKey`,是常量,放在`config.default.ts`文件中

在`src/configuration.ts`配置目录加载`config.default.ts`

```js
import { Configuration, App } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
import { join } from 'path';
import * as bodyParser from 'koa-bodyparser';

@Configuration({
  conflictCheck: true,
  importConfigs: [join(__dirname, './config/')],
})
export class ContainerLifeCycle {
  @App()
  app: Application;

  async onReady() {
    // bodyparser options see https://github.com/koajs/bodyparser
    this.app.use(bodyParser());
    //全局中间件
    this.app.use(await this.app.generateMiddleware('staticMiddleware'));
  }
}
```



