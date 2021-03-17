/**
 * 参数装饰器
 * @param target 静态方法是类的构造器 普通方法是类的原型对象
 * @param propertyKey 参数所在方法的方法名
 * @param parameterIndex 在方法参数列表的索引值
 */

function logParam(paramName: string = ''): ParameterDecorator {
  return (target: any, propertyKey: string, paramIndex: number) => {
    if (!target.__metadata) {
      target.__metadata = {}
    }
    if (!target.__metadata[propertyKey]) {
      target.__metadata[propertyKey] = []
    }
    target.__metadata[propertyKey].push({
      paramName,
      paramIndex
    })
  }
}

const Logs: MethodDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => {
  const className = target.constructor.name;
  const oldValue = descriptor.value;
  descriptor.value = function(...params) {
      let paramInfo = '';
      if (target.__metadata && target.__metadata[key]) {
          target.__metadata[key].forEach(item => {
              paramInfo += `\n * 第${item.paramIndex}个参数${item.paramName}的值为: ${params[item.paramIndex]}`;
          })
      }
      console.log(`调用${className}.${key}()方法` + paramInfo);
      return oldValue.apply(this, params);
  };
};


class ParamClass {
  private name: string;

  constructor(name: string) {
      this.name = name;
  }

  @Logs
  getName (): string {
      return 'Tom';
  }

  @Logs
  setName(@logParam() name: string): void {
      this.name = name;
  }

  @Logs
  setNames( @logParam('firstName') firstName: string, @logParam('lastName') lastName: string): void {
      this.name = firstName + '' + lastName;
  }
}


const paramClass = new ParamClass('Tom')

paramClass.setName('mary')

paramClass.setNames('mary', 'jack')