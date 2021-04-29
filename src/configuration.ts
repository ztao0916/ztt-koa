import { Configuration, App } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
import { ILifeCycle } from '@midwayjs/core';
import { join } from 'path';
import * as bodyParser from 'koa-bodyparser';
import * as typegoose from '@midwayjs/typegoose';

@Configuration({
  conflictCheck: true,
  importConfigs: [join(__dirname, './config/')],
  imports: [typegoose],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    // bodyparser options see https://github.com/koajs/bodyparser
    this.app.use(bodyParser());
    //全局中间件(加载静态资源)
    this.app.use(await this.app.generateMiddleware('staticMiddleware'));
    //全局中间件(打印请求信息)
    this.app.use(await this.app.generateMiddleware('reportMiddleware'));
    ////全局中间件(统一返回数据结构)
    this.app.use(await this.app.generateMiddleware('dataHandleMiddleware'));
    //全局中间件(统一路由权限)
    this.app.use(await this.app.generateMiddleware('koajwtMiddleware'));
  }
}
