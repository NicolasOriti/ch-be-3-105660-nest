import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { isValidObjectId, type Model } from 'mongoose';
import type { NewUserInput, User } from '../../../domain/models/user.js';
import { UserRepository } from '../../../domain/ports/user.repository.js';
import { UserDocument, type WithId } from './schemas.js';

const toDomain = (doc: WithId<UserDocument>): User => ({
  id: doc._id.toString(),
  firstName: doc.firstName,
  lastName: doc.lastName,
  email: doc.email,
  password: doc.password,
  role: doc.role,
  pets: doc.pets,
});

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(UserDocument.name) private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    const docs = await this.model.find().lean<WithId<UserDocument>[]>();
    return docs.map(toDomain);
  }

  async findById(id: string): Promise<User | null> {
    if (!isValidObjectId(id)) return null;
    const doc = await this.model.findById(id).lean<WithId<UserDocument>>();
    return doc ? toDomain(doc) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.model
      .findOne({ email })
      .lean<WithId<UserDocument>>();
    return doc ? toDomain(doc) : null;
  }

  async create(input: NewUserInput): Promise<User> {
    const doc = await this.model.create(input);
    return toDomain(doc.toObject() as WithId<UserDocument>);
  }
}
