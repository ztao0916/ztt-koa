// 目的: 把routes文件夹下的路由组装起来
import 'reflect-metadata';
/**
 * 类装饰器
 * @description 主要是给类加上统一的路由地址,比如/api
 */
export function Controller(basePath:string): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata('basePath', basePath, target);
  }
}

/**
 * 方法装饰器工厂
 * @description 传入方法类型比如get,post,组装路由
 */
export type RouterDecoratorFactory = (path?: string) => MethodDecorator;

/**
 * 创建路由装饰器工厂
 * @param {string} method 路由method('get'、'post' 等)
 * @return {RouterDecoratorFactory} 路由装饰器工厂
 */
export interface Route {
  propertyKey: string;
  method: string;
  path: string;
}

export function createRouteFactory(method:string): RouterDecoratorFactory{
  return (path?: string |undefined) => (target: any, propertyKey: string, descriptor: PropertyDescriptor)=> {
    //先把方法的名称,请求方式,请求地址收集起来
    const route:Route = {
      propertyKey,
      method,
      path
    };
    //判断类上是否有routes数组,用来保存该类下的路由信息
    if(!Reflect.getMetadata('routes', target)){
      Reflect.defineMetadata('routes', [], target) //定义一个数组在target上
    }
    //获取到路由数组,把路由推送进去
    const routes = Reflect.getMetadata('routes', target);
    routes.push(route);
  }
}

export const Get:RouterDecoratorFactory = createRouteFactory('get');

export const Post:RouterDecoratorFactory = createRouteFactory('post');

export const Put:RouterDecoratorFactory = createRouteFactory('put');

export const Delete:RouterDecoratorFactory = createRouteFactory('delete');

@Controller('/api')
class Demo{
  @Get('/md1')
  static md1(){

  }
  @Post('/md2')
  static md2(){

  }
  @Put('/md3')
  static md3(){

  }
}

console.log(Reflect.getMetadata('routes', Demo), Reflect.getMetadata('basePath', Demo))