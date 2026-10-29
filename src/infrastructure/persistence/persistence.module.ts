import { Module, DynamicModule } from '@nestjs/common';
import { ConfigKeys } from '../../config/config-keys.enum.js';
import { ConfigService } from '@nestjs/config';
import { USER_REPOSITORY } from '../../domain/ports/user.repository.js';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from '../adapters/mongo/schemas.js';
import { MongoUserRepository } from '../adapters/mongo/mongo-user.repository.js';

export const PERSISTENCE_KINDS = ['mongo', 'sql', 'file'] as const;
export type PersistenceKind = (typeof PERSISTENCE_KINDS)[number];

const REPOSITORY_TOKENS = [USER_REPOSITORY];

export function readPersistenceKind(): PersistenceKind {
  const value = process.env[ConfigKeys.PERSISTENCE] ?? 'mongo';
  if (!(PERSISTENCE_KINDS as readonly string[]).includes(value)) {
    throw new Error(`Invalid persistence kind: ${value}`);
  }
  return value as PersistenceKind;
}

@Module({})
export class PersistenceModule {
  static forRoot(kind: PersistenceKind = readPersistenceKind()): DynamicModule {
    switch (kind) {
      case 'mongo':
        return {
          module: PersistenceModule,
          imports: [
            MongooseModule.forRootAsync({
              inject: [ConfigService],
              useFactory: (config: ConfigService) => ({
                uri: config.getOrThrow<string>(ConfigKeys.DATABASE_URL),
              }),
            }),
            MongooseModule.forFeature([
              { name: UserDocument.name, schema: UserSchema },
            ]),
          ],
          providers: [
            { provide: USER_REPOSITORY, useClass: MongoUserRepository },
          ],
          exports: REPOSITORY_TOKENS,
        };
      default:
        throw new Error(`Persistence kind "${kind}" is not implemented`);
    }
  }
}
