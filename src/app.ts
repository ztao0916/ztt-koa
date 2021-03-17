import Koa from 'koa';
import cors from '@koa/cors';
import "reflect-metadata";
import bodyParser from 'koa-bodyparser';
import { logger } from './middlewares/logger';
import router from './router'

// 初始化 Koa 应用实例
const app = new Koa();

// 注册中间件
app.use(cors());
app.use(bodyParser());

//注册路由
app.use(router.routes()).use(router.allowedMethods());

// 响应用户请求
app.use(async (ctx: Koa.Context) => {
  ctx.body = '你好 koa';
});
// 运行服务器
app.listen(3000, () => {
  logger.info(`Server running on port 3000`)
});