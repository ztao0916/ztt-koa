import { Provide } from '@midwayjs/decorator';
import { join } from 'path';
import * as koaStatic from 'koa-static';
import { IWebMiddleware } from '@midwayjs/koa';

/**
 * 处理静态文件中间件
 */
@Provide()
export class staticMiddleware implements IWebMiddleware {
  resolve() {
    return koaStatic(join(__dirname, '../public'));
  }
}
