import { CustomRepository } from '@app/decorator/typeorm-ex.decorator';
import { Lesson } from '@app/entity/lesson.entity';
import { Repository } from 'typeorm';

export interface WeekofDaysLessonDate extends Lesson {
  dayOfWeek: string;
}

@CustomRepository(Lesson)
export class LessonRepository extends Repository<Lesson> {
  async findLessonByCoachId(
    lessonStartTime: string,
    lessonEndTime: string,
    coachId: number,
  ): Promise<Partial<WeekofDaysLessonDate[]>> {
    return await this.createQueryBuilder('lesson')
      .select([
        'lessonStartTime',
        'lessonEndTime',
        'lessonType',
        'durationsType',
        'coachId',
        'DAYOFWEEK(lessonStartTime) as dayOfWeek',
      ])
      .where('DATE_FORMAT(lessonStartTime,"%Y-%m-%d") >= :lessonStartTime', {
        lessonStartTime,
      })
      .andWhere('DATE_FORMAT(lessonEndTime,"%Y-%m-%d") < :lessonEndTime', {
        lessonEndTime,
      })
      .andWhere('coachId = :coachId', { coachId })
      .getRawMany();
  }

  async findLessonByRegulrCoachId(
    lessonStartTime: string,
    coachId: number,
  ): Promise<Partial<WeekofDaysLessonDate[]>> {
    return await this.createQueryBuilder('lesson')
      .select([
        'lessonStartTime',
        'lessonEndTime',
        'lessonType',
        'coachId',
        'durationsType',
        'DAYOFWEEK(lessonStartTime) as dayOfWeek',
      ])
      .where('lessonType = :lessonType', { lessonType: 2 })
      .andWhere('coachId = :coachId', { coachId })
      .andWhere('DATE_FORMAT(lessonStartTime,"%Y-%m-%d") < :lessonStartTime', {
        lessonStartTime,
      })
      .getRawMany();
  }
  async findCourtCountGroupby(lessonStartTime: string, lessonEndTime: string) {
    return this.createQueryBuilder('lesson')
      .select([
        'lesson.lessonStartTime',
        'lesson.lessonEndTime',
        'count(id) as count',
      ])
      .groupBy('lesson.lessonStartTime,lesson.lessonEndTime')
      .getRawMany();
  }
}
