/**
 * 异常处理中间件(中间件一定是一个函数)
 */
import Koa from 'koa';

export default function errHandle(): Koa.Middleware {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    try {
      await next();
      if (ctx.status === 404) {//404表示没有该请求地址
        ctx.body = {
          code: 404,
          msg: '该请求地址不存在'
        }
      }else if (ctx.status === 200) { //200表示请求成功
        const oldValue = ctx.body;
        ctx.body = {
          code: 200,
          msg: ctx.message,
          data: oldValue
        }
      }else {
        ctx.body = {
          code: ctx.status
        }
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        msg: error || error.message
      }
    }
  }
}