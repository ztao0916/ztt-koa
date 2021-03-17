import { Context } from 'koa';
import { Controller, Get, Post, Delete } from '../common/routerDecorator';

@Controller('/users')
export default class UserController {
  @Get('')
  public static async listUsers(ctx: Context) {
    ctx.body = 'ListUsers controller';
  }
  @Get('/detail/:id')
  public static async showUserDetail(ctx: Context) {
    ctx.body = `ShowUserDetail controller with ID = ${ctx.params.id}`;
  }

  @Post('/update/:id')
  public static async updateUser(ctx: Context) {
    ctx.body = `UpdateUser controller with ID = ${ctx.params.id}`;
  }

  @Delete('/delete/:id')
  public static async deleteUser(ctx: Context) {
    ctx.body = `DeleteUser controller with ID = ${ctx.params.id}`;
  }
}