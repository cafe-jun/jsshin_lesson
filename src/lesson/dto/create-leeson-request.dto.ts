import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  isArray,
} from 'class-validator';
import { CoachType } from '../type/coach.type';
import { LessonType } from '../type/lesson.type';
import { LessonDuration } from '../type/lesson-duration.type';
import { Lesson } from '@app/entity/lesson.entity';
import * as dayjs from 'dayjs';

export class CreateLessonRequestDto {
  @IsNotEmpty()
  @IsEnum(CoachType)
  coachId: number;

  @IsNotEmpty()
  @IsEnum(LessonType)
  lessonType: number;

  @IsNotEmpty()
  @IsNumber()
  frequenciesType: number;

  @IsNotEmpty()
  @IsEnum(LessonDuration)
  lessonDuration: number;

  @IsArray()
  @ArrayNotEmpty()
  lessonStartTimes: Date[];

  @IsNotEmpty()
  @IsString({ message: '유저이름을 입력해주세요' })
  username: string;

  @IsNotEmpty()
  @IsString({ message: '휴대폰번호를 입력해주세요' })
  userPhone: string;

  toEntitys(lessonId: string, password: string): Lesson[] {
    return this.lessonStartTimes.map((lessonStartTime) => {
      return Lesson.of(
        this.username,
        this.userPhone,
        this.coachId,
        this.lessonType,
        this.frequenciesType,
        this.lessonDuration,
        password,
        lessonStartTime,
        this.getLessonEndTime(this.lessonDuration, lessonStartTime),
        lessonId,
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
    lessonStartTimes: Date[],
  ): CreateLessonRequestDto {
    const dto = new CreateLessonRequestDto();
    dto.username = username;
    dto.userPhone = userPhone;
    dto.coachId = coachId;
    dto.lessonType = lessonType;
    dto.frequenciesType = frequenciesType;
    dto.lessonDuration = lessonDuration;
    return dto;
  }
}
