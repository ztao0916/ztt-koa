import { Provide } from '@midwayjs/decorator';
import { join } from 'path';
import * as koaStatic from 'koa-static';
import { IWebMiddleware } from '@midwayjs/koa';

@Provide()
export class staticMiddleware implements IWebMiddleware {
  resolve() {
    return koaStatic(join(__dirname, '../public'));
  }
}
