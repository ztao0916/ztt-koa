import path from 'path';
import fs from 'fs';
import KoaRouter from 'koa-router';
import { Route } from './routerDecorator'

/**
 * 扫描指定的目录并添加路由
 * @param dirPath 扫描的目录
 * @param router 路由对象
 */
function scanController(dirPath: string, router:KoaRouter):void {
  if (!fs.existsSync(dirPath)) {
    //统一的错误处理[暂时用console]
    console.log('路径不存在')
    return;
  }
  const fileNames: string[] = fs.readdirSync(dirPath); //返回一个字符串数组
  // console.log(fileNames) //文件组成的数据
  for (let fileName of fileNames) {
    const curPath: string = path.join(dirPath, fileName);
    //如果当前路径是文件夹,递归
    if (fs.statSync(curPath).isDirectory()) {
      scanController(curPath, router);
      continue;//跳出当前循环,进入下一次循环
    }
    //不是文件夹,是文件,执行以下操作
    //判断文件是不是如下结尾[不是就跳出循环]
    if (!(/(.js|.jsx|.ts|.tsx)$/.test(fileName))) {
      continue;
    }
    try {
      const scannedModule = require(curPath);//获取到当前文件的导出构造对象或者default对象(包含构造函数)
      const controller = scannedModule.default || scannedModule;
      const isController: boolean = Reflect.hasMetadata('basePath', controller);
      const hasRoutes: boolean = Reflect.hasMetadata('routes', controller);
      if (isController && hasRoutes) {
        const basePath: string = Reflect.getMetadata('basePath', controller);
        const routes: Route[] = Reflect.getMetadata('routes', controller);
        routes.forEach((route: Route) => {
          let routePath: string = path.posix.join('/', basePath, route.path);//函数路径
          let routeHandler = controller[route.propertyKey]; //处理函数
          router[route.method](routePath, routeHandler); //等价于router.get('/a', function(){})
        });
      }
    } catch (error) {
      console.warn('文件读取失败！', curPath, error);
    }
  }
}

/**
 * 继承自koa-router
 */
export default class ScanRouter extends KoaRouter {
  constructor(opt?: KoaRouter.IRouterOptions) {
    super(opt)
  }
  scan(scanDir: string | string[]) {
    if (typeof (scanDir) === 'string') {
      scanController(scanDir, this);
    } else {
      scanDir.forEach(async (dir: string) => {
        scanController(dir, this);
      });
    }
  }
}