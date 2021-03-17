
/**
 * 方法装饰器
 * @param target  静态方法是类的构造器  普通方法是类的原型对象
 * @param propertyKey 方法名称
 * @param descriptor 属性描述符,等价于Object.defineProperty,参数同
 */

const Log: MethodDecorator = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  console.log(target.constructor.prototype)
  const className = target.constructor.name;//constructor固有属性,可以打印一个函数的prototype看看
  const oldValue = descriptor.value;
  descriptor.value = function (...params) {
    console.log(`调用${className}.${propertyKey}方法`)
    return oldValue.apply(this, params);
  }
}

class MyClass {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  @Log
  getName(): string {
    return this.name
  }
}

const entity = new MyClass('Tom');

const name = entity.getName();

console.log(name)