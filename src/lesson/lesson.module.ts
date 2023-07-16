import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonRepository } from './lesson.repository';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { TypeOrmExModule } from 'src/config/mysql/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([LessonRepository])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
