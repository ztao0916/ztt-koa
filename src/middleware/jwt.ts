import { Provide, Config } from '@midwayjs/decorator';
import * as koaJwt from 'koa-jwt';
import { IWebMiddleware } from '@midwayjs/koa';

@Provide()
export class koajwtMiddleware implements IWebMiddleware {
  @Config('secretKey')
  secret;

  resolve() {
    return koaJwt({ secret: this.secret, algorithms: ['HS256'] }).unless({
      // path: ['/api/users/login', '/api/users/register'],
      path: [/^(\/api\/user\/)/],
    });
  }
}
