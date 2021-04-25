import { Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { getModelForClass } from '@typegoose/typegoose';
import { People } from '../entity/user';

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

  async getTest() {
    //获取model
    const UserModel = getModelForClass(People);
    //创建数据
    const { _id: id } = await UserModel.create({
      name: 'john',
      jobs: ['清洁工', '装修工'],
    } as People);

    //查询数据
    const user = await UserModel.findById(id).exec();
    console.log(user);
    return user;
  }
}
