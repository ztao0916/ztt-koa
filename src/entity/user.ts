import { prop } from '@typegoose/typegoose';

export class User {
  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public pwd: string;

  @prop()
  public confirm_pwd?: string;

  @prop({ type: () => [String] })
  public jobs?: string[];
}
