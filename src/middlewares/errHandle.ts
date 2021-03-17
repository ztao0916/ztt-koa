/**
 * 异常处理中间件(中间件一定是一个函数)
 */
import Koa from 'koa';

export default function errHandle(): Koa.Middleware {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    
  }
}