import { IsNumber, IsString } from 'class-validator';
import { Lesson } from '@app/entity/lesson.entity';
import * as dayjs from 'dayjs';
import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonRequestDto } from './create-leeson-request.dto';
import { LessonDuration } from '../type/lesson-duration.type';
export class UpdateLessonRequestDto extends PartialType(
  CreateLessonRequestDto,
) {
  @IsString({ message: 'LessonId를 입력하세요' })
  lessonId: string;

  @IsString({ message: 'Password를 입력하세요' })
  password: string;

  toUpdateEntitys(): Lesson[] {
    return this.lessonStartTimes.map((lessonStartTime) => {
      return Lesson.of(
        this.username,
        this.userPhone,
        this.coachId,
        this.lessonType,
        this.frequenciesType,
        this.lessonDuration,
        this.password,
        lessonStartTime,
        this.getLessonEndTime(this.lessonDuration, lessonStartTime),
        this.lessonId,
      );
    });
  }
  private getLessonEndTime(
    lessonDuration: number,
    lessonStartTime: Date,
  ): Date {
    if (lessonDuration === LessonDuration.HALF_HOURS) {
      return dayjs(lessonStartTime).add(30, 'minutes').toDate();
    } else {
      return dayjs(lessonStartTime).add(1, 'hour').toDate();
    }
  }
  static of(
    username: string,
    userPhone: string,
    coachId: number,
    lessonType: number,
    frequenciesType: number,
    lessonDuration: number,
  ): UpdateLessonRequestDto {
    const dto = new UpdateLessonRequestDto();
    dto.username = username;
    dto.userPhone = userPhone;
    dto.coachId = coachId;
    dto.lessonType = lessonType;
    dto.frequenciesType = frequenciesType;
    dto.lessonDuration = lessonDuration;
    return dto;
  }
}
