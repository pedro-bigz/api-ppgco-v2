import { Module } from '@nestjs/common';
import { SequelizeConfig, TypeOrmConfig } from './database';
import { StorageApi } from './api';

@Module({
  providers: [StorageApi, SequelizeConfig, TypeOrmConfig],
  exports: [StorageApi, SequelizeConfig, TypeOrmConfig],
})
export class ConfigModule {}
