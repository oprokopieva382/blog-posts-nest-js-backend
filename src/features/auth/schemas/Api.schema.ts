import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApiCallDocument = HydratedDocument<ApiCall>;
@Schema()
export class ApiCall {
  @Prop({ required: true })
  IP: string;

  @Prop({ required: true })
  URL: string;

  @Prop({ required: true })
  date: Date;
}

export const ApiCallSchema = SchemaFactory.createForClass(ApiCall);
