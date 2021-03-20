import Koa from "koa";
import cors from "@koa/cors";
import returnHandle from "./middlewares/returnHandle";
import bodyParser from "koa-bodyparser";
import router from "./router";

// 初始化 Koa 应用实例
const app = new Koa();

// 注册中间件
app.use(cors());
app.use(bodyParser());

// 注册返回数据处理中间件
app.use(returnHandle());

// 注册路由
app.use(router.routes()).use(router.allowedMethods());

// 运行服务器
app.listen(3000, () => {
  console.info(`Server running on port 3000`);
});
