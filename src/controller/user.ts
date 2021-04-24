import {
  Controller,
  Get,
  Inject,
  Provide,
  Query,
  Post,
  Body,
  ALL,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { User } from '../interface';

@Provide()
@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Get('/')
  //get请求: 传递参数id,返回User类型的数据;如果id不传,就没id这个字段[可以做个非空校验,这样返回的字段一直是三个]
  async getUser(@Query() id: number): Promise<User> {
    console.log(this.ctx.query);
    return {
      id: id || 0,
      name: '娃哈哈',
      age: 18,
    };
  }

  @Post('/')
  //使用ALL获取ctx.request.body整个body对象
  async updateUser(@Body(ALL) user: User): Promise<User> {
    //post请求按照官方文档来,打印下面语句报错,会有个错误:类型Request上不存在属性body,需要安装@types/koa-bodyparser
    console.log(this.ctx.request.body);
    return user;
  }
}
