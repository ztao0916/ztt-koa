import { Provide } from '@midwayjs/decorator';
import {
  IWebMiddleware,
  IMidwayKoaContext,
  IMidwayKoaNext,
} from '@midwayjs/koa';

@Provide()
export class dataHandleMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: IMidwayKoaContext, next: IMidwayKoaNext) => {
      try {
        await next();
        switch (ctx.status) {
          case 200:
            // 请求成功
            ctx.body = {
              code: 200,
              msg: ctx.message,
              data: ctx.body,
            };
            break;
          case 401:
            // 401表示没有授权token
            ctx.body = {
              code: 401,
              msg: '请重新重新登录',
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
      } catch (error) {
        console.log(error);
        ctx.body = {
          msg: error || error.message,
        };
      }
    };
  }
}
