import { Provide, Config, Init } from '@midwayjs/decorator';
import { getModelForClass } from '@typegoose/typegoose';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/user';
import { LoginDTO, RegistryDTO } from '../dto/user';

@Provide()
export class UserService {
  @Config('secretKey')
  secret;

  useModel;
  @Init()
  async init() {
    //获取model
    this.useModel = getModelForClass(User);
  }

  async login(user: LoginDTO) {
    const { name, pwd } = user;
    //先查询数据库有无当前name
    const findUser = await this.useModel.findOne({ name }).exec();
    if (findUser) {
      if (await argon2.verify(findUser.pwd, pwd)) {
        return {
          token: jwt.sign({ name }, this.secret),
        };
      } else {
        return '登录失败';
      }
    } else {
      return '该用户不存在';
    }
  }

  async register(user: RegistryDTO) {
    const { name, pwd } = user;
    //先查询数据库有无当前name
    const hasName = await this.useModel.find({ name }).exec();
    if (hasName.length > 0) {
      return '该用户已存在';
    } else {
      //加密pwd
      const newPwd = await argon2.hash(pwd);
      //创建数据
      const { _id } = await this.useModel.create({
        name,
        pwd: newPwd,
      } as User);
      //查找数据
      const createUser = await this.useModel.findById(_id).exec();
      //返回查找的数据
      return createUser;
    }
  }
}
