import {
  Controller,
  Inject,
  Provide,
  Post,
  Body,
  ALL,
  Config,
  Validate,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import * as jwt from 'jsonwebtoken';
import { LoginDTO, RegistryDTO } from '../dto/user';

@Provide()
@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Config('secretKey')
  secret;

  @Post('/registry')
  @Validate()
  async register(@Body(ALL) user: RegistryDTO) {
    return user;
  }

  @Post('/login')
  @Validate()
  async login(@Body(ALL) user: LoginDTO) {
    const { key } = this.secret;
    const { name, pwd } = user;
    console.log(name, pwd);
    return {
      token: jwt.sign({ name, pwd }, key),
    };
  }
}
