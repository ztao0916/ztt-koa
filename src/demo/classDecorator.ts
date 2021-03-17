/**
 * 类装饰器
 * @param target 类装饰器只有一个参数target,target为类的构造函数
 * */
// const Controller: ClassDecorator = (target: any) => {
//   target.isController = true;
// };

// @Controller
// export class MyClass {
//   static isController: any;
// }

interface Mixinable {
  [funcName: string]: Function;
}

//给装饰器传参: 工厂函数
function mixin(list: Mixinable[]): ClassDecorator {
  return (target: any) => {
    Object.assign(target.prototype, ...list)
  }
}


function demo(list: any): ClassDecorator {
  return (target: any) => {
    target.prototype.demo = list
  }
}

const mixin1:Mixinable = {
  fun1() {
    return 'fun1'
  }
}

const mixin2:Mixinable = {
  fun2() {
    return 'fun2'
  }
}

@mixin([mixin1, mixin2])
@demo('demo')
class myClass {
  [x: string]: any
}


console.log(new myClass().__proto__)