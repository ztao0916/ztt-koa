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
// import * as jwt from 'jsonwebtoken';
import { LoginDTO, RegistryDTO } from '../dto/user';
import { UserService } from '../service/user';

@Provide()
@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Config('secretKey')
  secret;

  @Inject()
  userService: UserService;

  @Post('/registry')
  @Validate()
  async register(@Body(ALL) user: RegistryDTO) {
    const registerUser = await this.userService.register(user);
    return registerUser;
  }

  @Post('/login')
  @Validate()
  async login(@Body(ALL) user: LoginDTO) {
    const loginUser = await this.userService.login(user);
    return loginUser;
  }
}
