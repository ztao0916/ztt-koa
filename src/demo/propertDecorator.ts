/**
 * 属性装饰器
 * @param target 静态属性是类的构造器 否则就是类的原型对象
 * @param propertyKey 属性名
 * 传入的装饰器的值 多次使用会叠加
 */

import { trace } from "console";

interface CheckRule {
  required: Boolean
}

interface MetaData {
  [key: string]: CheckRule
}

const Required: PropertyDecorator = (target: any, key: string) => {
  target.__metadata = target.__metadata ? target.__metadata : {};
  target.__metadata[key] = { required: true }
  console.log(target)
}



class MyClass {
  @Required
  name: string;

  @Required
  type: string;

}

const my = new MyClass()

console.log('实例是', my)

function validate(entity): boolean {
  // @ts-ignore: 忽略错误
  const metadata: MetaData = entity.__metadata;
  if (metadata) {
    let i: number,
      key: string,
      rule: CheckRule;
    const keys = Object.keys(metadata);
    for (i = 0; i < keys.length; i++){
        key = keys[i];
        rule = metadata[key]
        if (rule.required && (entity[key] === undefined || entity[key] === null || entity[key] === '')) {
          return false;
        }
    }
  }
  return true;
}

const entity: MyClass = new MyClass();
entity.name = 'name';
const result: boolean = validate(entity);
console.log(result); // 输出结果：false