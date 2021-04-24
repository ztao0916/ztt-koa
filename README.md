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
│   └── public	# 静态资源
│   ├── config  # 应用配置文件夹
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



