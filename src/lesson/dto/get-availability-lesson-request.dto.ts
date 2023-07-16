import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';
import { CoachType } from '../type/coach.type';
import { LessonType } from '../type/lesson.type';
import { LessonDuration } from '../type/lesson-duration.type';

export class GetAvailabilityLessonRequestDto {
  @IsNotEmpty()
  @IsNumberString()
  coachId: number;
  @IsNotEmpty()
  @IsNumberString()
  lessonType: number;
  @IsNotEmpty()
  @IsNumberString()
  lessonDuration: number;

  static of(
    coachId: number,
    lessonType: number,
    lessonDuration: LessonDuration,
  ): GetAvailabilityLessonRequestDto {
    const dto = new GetAvailabilityLessonRequestDto();
    dto.coachId = coachId;
    dto.lessonDuration = lessonDuration;
    dto.lessonType = lessonType;
    return dto;
  }
}
