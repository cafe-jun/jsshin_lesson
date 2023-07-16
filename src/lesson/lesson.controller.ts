import { CreateLessonRequestDto } from './dto/create-leeson-request.dto';
import { LessonService } from './lesson.service';
import { Lesson } from './../entity/lesson.entity';
import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { GetAvailabilityLessonRequestDto } from './dto/get-availability-lesson-request.dto';
import { UpdateLessonRequestDto } from './dto/update-leeson-request.dto';

@Controller('lessons')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Get('/availability')
  async getLessonAvailability(@Query() dto: GetAvailabilityLessonRequestDto) {
    return await this.lessonService.getLessonAvailability(dto);
  }

  @Post('/')
  async createLesson(@Body() dto: CreateLessonRequestDto) {
    return await this.lessonService.createLesson(dto);
  }

  @Put('/')
  async updateLesson(@Body() dto: UpdateLessonRequestDto) {
    return await this.lessonService.updateLesson(dto);
  }

  @Delete('/')
  async deleteLesson(@Body() dto: CreateLessonRequestDto) {
    return await this.lessonService.createLesson(dto);
  }
}
