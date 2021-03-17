/**
 * 装饰器的执行顺序
 * 就近原则
 */

const A: ClassDecorator = (target: any) => {
  console.log('A')
}

const B: ClassDecorator = (target: any): void => {
 console.log('B')
}

@A
@B
class Demo {

}

//输出为B,A