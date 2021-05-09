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
import { PhotoService } from '../service/photo';

@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  photoService: PhotoService;

  @Get('/mysql')
  async save() {
    const photo = await this.photoService.savePhoto();
    return photo;
  }

  @Post('/get_user', { middleware: ['reportMiddleware'] })
  async postUser(@Body() uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
}
