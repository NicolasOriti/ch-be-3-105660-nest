import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { Types } from 'mongoose';
import type { Role } from '../../../domain/models/user.js';

@Schema({ collection: 'users', versionKey: false })
export class UserDocument {
  @Prop({ required: true }) firstName!: string;
  @Prop({ required: true }) lastName!: string;
  @Prop({ required: true, unique: true }) email!: string;
  @Prop({ required: true }) password!: string;
  @Prop({ type: String, enum: ['user', 'admin'], default: 'user' })
  role!: Role;
  @Prop({ type: [String], default: [] }) pets!: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);

export type WithId<T> = T & { _id: Types.ObjectId };
