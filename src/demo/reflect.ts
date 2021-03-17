/**
 * 定义元数据
 * Reflect.defineMetadata(metadataKey, metadataValue, target);
 * Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
 */
/**
 * 检查指定的元数据是否存在[会遍历继承链]
 * Reflect.hasMetadata(metadataKey, target);
 * Reflect.hasMetadata(metadataKey, target, propertyKey);
 */

/**
 * 检查指定的元数据是否存在[不会遍历继承链]
 * Reflect.hasOwnMetadata(metadataKey, target);
 * Reflect.hasOwnMetadata(metadataKey, target, propertyKey);
 */

/**
 * 获取指定关键词的元数据[会遍历继承链]
 * Reflect.getMetadata(metadataKey, target);
 * Reflect.getMetadata(metadataKey, target,propertyKey);
 */

/**
 * 获取指定关键词的元数据[不会遍历继承链]
 * Reflect.getOwnMetadata(metadataKey, target);
 * Reflect.getOwnMetadata(metadataKey, target,propertyKey);
 */

/**
 * 获取元数据的所有关键字[会遍历继承链]
 * Reflect.getMetadataKeys(target);
 * Reflect.getMetadataKeys(target,properyKey);
 */

/**
 * 获取元数据的所有关键字[不会遍历继承链]
 * Reflect.getOwnMetadataKeys(target);
 * Reflect.getOwnMetadataKeys(target,properyKey);
 */

/**
 * 删除指定关键字的元数据
 * Reflect.deleteMetadata(metadataKey, target);
 * Reflect.deleteMetadata(metadataKey, target,propertyKey);
 */

/**
 * 装饰器方式设置元数据
 * @Reflect.metadata(metadataKey, metadataValue)
 * class C {
 * }
 */
//作用: 在声明的时候添加和读取元数据,通过这种方法给对象添加额外的信息,不会影响原对象结构
import 'reflect-metadata'

@Reflect.metadata('token', 'abc_token')
class Employee {
    @Reflect.metadata('demo', '123')
    setName() {
        return 'Mary'
    }
    @Reflect.metadata('demo01', '123456')
    static getName() {
        return 'Tom'
    }
}

console.log(Reflect.getMetadata('token', Employee),
    Reflect.getMetadata('demo', new Employee(), 'setName'),
    Reflect.getMetadata('demo01', Employee, 'getName')
)

function Controller1(basePath: string): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata('basePath', basePath, target)
    }
}

function get(path: string): MethodDecorator {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const basePath = Reflect.getMetadata('basePath', target)
        console.log('基本路径', basePath)
        Reflect.defineMetadata('path', path, target, key)
    }
}

@Controller1('/api')
class Employees {
    @get('/init')
    async init() {}
}


const initPath = Reflect.getMetadata('path', new Employees(), 'init')

console.log(initPath)
