import { Configuration, App } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
import * as bodyParser from 'koa-bodyparser';

@Configuration({
  conflictCheck: true,
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
