import { prop } from '@typegoose/typegoose';

export class User {
  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public pwd: string;

  @prop({ type: () => [String], default: ['泥瓦工'] })
  public jobs?: string[];

  public get password() {
    return `${this.pwd}`;
  }
  public set password(pass) {
    this.pwd = pass;
  }
}
