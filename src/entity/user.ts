import { prop } from '@typegoose/typegoose';

export class People {
  @prop()
  public name?: string;

  @prop({ type: () => [String] })
  public jobs?: string[];
}
