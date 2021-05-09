import { Provide } from '@midwayjs/decorator';
import {
  IWebMiddleware,
  IMidwayKoaContext,
  IMidwayKoaNext,
} from '@midwayjs/koa';

@Provide()
export class dataMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: IMidwayKoaContext, next: IMidwayKoaNext) => {
      try {
        await next();
        // 请求成功
        const reg = /swagger/;

        if (!ctx.url.match(reg).length) {
          ctx.body = {
            code: 200,
            msg: ctx.message,
            data: ctx.body,
          };
        }
      } catch (error) {
        switch (error.status) {
          case 401:
            // 401表示没有授权token
            ctx.body = {
              code: 401,
              msg: '请登录',
            };
            break;
          case 403:
            // 服务器拒绝请求
            ctx.body = {
              code: 403,
              msg: '服务器拒绝该请求',
            };
            break;
          case 404:
            // 404表示没有该请求地址
            ctx.body = {
              code: 404,
              msg: '该请求地址不存在',
            };
            break;
          case 405:
            // 405表示ctx.url请求不允许使用ctx.method方法请求
            ctx.body = {
              code: 405,
              msg: `${ctx.url}请求不允许使用${ctx.method}方法`,
            };
            break;
          case 500:
            // 服务器遇到错误,无法完成请求
            ctx.body = {
              code: 500,
              msg: '服务器遇到错误,无法完成请求',
            };
            break;
          default:
            // 服务器拒绝请求
            ctx.body = {
              code: 403,
              msg: '服务器拒绝该请求',
            };
            break;
        }
      }
    };
  }
}
