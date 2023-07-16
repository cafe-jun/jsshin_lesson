import { Module } from '@nestjs/common';
import { MySqlConfigService } from './mysql-config.service';
import { ConfigService, ConfigModule } from '@nestjs/config';
import configuration from './mysql.configuration';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        DB_HOST: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_DATABASE: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, MySqlConfigService],
  exports: [MySqlConfigService],
})
export class MySqlConfigModule {}
