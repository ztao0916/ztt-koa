import { Provide } from '@midwayjs/decorator';
import * as koaJwt from 'koa-jwt';
import { IWebMiddleware } from '@midwayjs/koa';

@Provide()
export class koajwtMiddleware implements IWebMiddleware {
  resolve() {
    return koaJwt({ secret: '123', algorithms: ['HS256'] }).unless({
      // path: ['/api/users/login', '/api/users/register'],
      path: [/^(\/api\/user\/)/],
    });
  }
}
