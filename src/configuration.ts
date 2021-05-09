import { Configuration, App } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
import { join } from 'path';
import * as bodyParser from 'koa-bodyparser';
import * as orm from '@midwayjs/orm';
import * as swagger from '@midwayjs/swagger';

@Configuration({
  conflictCheck: true,
  importConfigs: [join(__dirname, './config/')],
  imports: [
    orm,
    {
      component: swagger,
      enabledEnvironment: ['local'],
    },
  ],
})
export class ContainerLifeCycle {
  @App()
  app: Application;

  async onReady() {
    // bodyparser options see https://github.com/koajs/bodyparser
    this.app.use(bodyParser());
    /**
     * 全局中间件: 处理静态文件
     */
    this.app.use(await this.app.generateMiddleware('staticMiddleware'));
    /**
     * 全局中间件: 处理请求返回的数据
     */
    // this.app.use(await this.app.generateMiddleware('dataMiddleware'));
  }
}
