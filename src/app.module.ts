import { Module } from '@nestjs/common';
import { appConfigModule } from './config/app-config.module.js';
import {
  CONTROLLERS,
  USE_CASES,
  DOMAIN_SERVICES,
} from './app.module-components.js';
import { PersistenceModule } from './infrastructure/persistence/persistence.module.js';

@Module({
  imports: [appConfigModule(), PersistenceModule.forRoot()],
  controllers: [...CONTROLLERS],
  providers: [...USE_CASES, ...DOMAIN_SERVICES],
})
export class AppModule {}
