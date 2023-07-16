import { Lesson } from '@app/entity/lesson.entity';
import { WeekofDaysLessonDate } from '@app/lesson/lesson.repository';
import * as dayjs from 'dayjs';

export const seedLessonDate: Partial<Partial<WeekofDaysLessonDate>[]> = [
  {
    lessonStartTime: dayjs('2023-07-16T23:30:00.000Z').toDate(),
    lessonEndTime: dayjs('2023-07-17T00:30:00.000Z').toDate(),
    lessonType: 2,
    durationsType: 2,
    coachId: 1,
    dayOfWeek: '2',
  },
  {
    lessonStartTime: dayjs('2023-07-17T00:30:00.000Z').toDate(),
    lessonEndTime: dayjs('2023-07-17T01:30:00.000Z').toDate(),
    lessonType: 2,
    durationsType: 2,
    coachId: 1,
    dayOfWeek: '2',
  },
  {
    lessonStartTime: dayjs('2023-07-17T01:30:00.000Z').toDate(),
    lessonEndTime: dayjs('2023-07-17T02:30:00.000Z').toDate(),
    lessonType: 2,
    durationsType: 2,
    coachId: 1,
    dayOfWeek: '2',
  },
  {
    lessonStartTime: dayjs('2023-07-17T03:30:00.000Z').toDate(),
    lessonEndTime: dayjs('2023-07-17T04:00:00.000Z').toDate(),
    lessonType: 2,
    durationsType: 1,
    coachId: 1,
    dayOfWeek: '2',
  },
  {
    lessonStartTime: dayjs('2023-07-17T09:30:00.000Z').toDate(),
    lessonEndTime: dayjs('2023-07-17T10:00:00.000Z').toDate(),
    lessonType: 2,
    durationsType: 1,
    coachId: 1,
    dayOfWeek: '2',
  },
  {
    lessonStartTime: dayjs('2023-07-17T23:30:00.000Z').toDate(),
    lessonEndTime: dayjs('2023-07-18T00:30:00.000Z').toDate(),
    lessonType: 2,
    durationsType: 2,
    coachId: 1,
    dayOfWeek: '3',
  },
  {
    lessonStartTime: dayjs('2023-07-15T23:30:00.000Z').toDate(),
    lessonEndTime: dayjs('2023-07-16T00:30:00.000Z').toDate(),
    lessonType: 2,
    durationsType: 2,
    coachId: 1,
    dayOfWeek: '1',
  },
];

export const regulrLessonDate = [
  {
    lessonStartTime: dayjs('2023-07-11T23:30:00.000Z').toDate(),
    lessonEndTime: dayjs('2023-07-12T00:30:00.000Z').toDate(),
    lessonType: 2,
    coachId: 1,
    durationsType: 2,
    dayOfWeek: '4',
  },
];
