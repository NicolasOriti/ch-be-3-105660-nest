import { ConfigModule } from '@nestjs/config';

export const appConfigModule = () =>
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath:
      process.env.NODE_ENV === 'test' ? ['.env.test', '.env'] : ['.env'],
  });
