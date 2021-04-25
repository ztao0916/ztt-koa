import {
  Inject,
  Controller,
  Post,
  Provide,
  Body,
  Get,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user';

@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/get_user', { middleware: ['reportMiddleware'] })
  async postUser(@Body() uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/get_user')
  async getUser() {
    const user = await this.userService.getTest();
    return { success: true, message: 'OK', data: user };
  }
}
