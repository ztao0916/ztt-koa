import { Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../entity/user';
import { LoginDTO, RegistryDTO } from '../dto/user';

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async login(user: LoginDTO) {
    //获取model
    const UserModel = getModelForClass(User);
    const { name } = user;
    //先查询数据库有无当前name
    const hasName = await UserModel.find({ name }).exec();
    console.log(hasName);
    if (hasName.length > 0) {
      return hasName;
    } else {
      return '该用户不存在';
    }
  }

  async register(user: RegistryDTO) {
    //获取model
    const UserModel = getModelForClass(User);
    const { name } = user;
    //先查询数据库有无当前name
    const hasName = await UserModel.find({ name }).exec();
    if (hasName.length > 0) {
      return '该用户已存在';
    } else {
      //创建数据
      const newUser = await UserModel.create(user as User);
      return newUser;
    }
  }
}
