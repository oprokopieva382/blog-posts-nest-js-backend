import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: new Date(), required: false })
  createdAt?: Date;
}

export const UserSchema =  SchemaFactory.createForClass(User)
