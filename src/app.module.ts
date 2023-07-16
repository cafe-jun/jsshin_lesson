import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySqlConfigService } from './config/mysql/mysql-config.service';
import { MySqlConfigModule } from './config/mysql/mysql-config.module';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import { LessonModule } from './lesson/lesson.module';
import { Lesson } from './entity/lesson.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MySqlConfigModule,
    LessonModule,
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      inject: [MySqlConfigService],
      useFactory: async (mysqlConfigService: MySqlConfigService) => {
        return {
          type: 'mysql',
          host: mysqlConfigService.db_host,
          port: mysqlConfigService.db_port,
          database: mysqlConfigService.db_database,
          username: mysqlConfigService.db_username,
          password: mysqlConfigService.db_password,
          entities: [Lesson],
          logging: true,
          synchronize: false,
        };
      },
      dataSourceFactory: async (option) => {
        return await new DataSource(option).initialize();
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
