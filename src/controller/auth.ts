import { Context } from 'koa';
import { Controller, Post } from '../common/routerDecorator';

@Controller('/auth')
export default class AuthController {
  @Post('/login')
  public static async login(ctx: Context) {
    ctx.body = 'Login controller';
  }
  @Post('/register')
  public static async register(ctx: Context) {
    ctx.body = 'Register controller';
  }
}