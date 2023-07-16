import { generateRandomString, getUUID } from './../util/random.util';
import { UpdateLessonRequestDto } from './dto/update-leeson-request.dto';
import { CreateLessonRequestDto } from './dto/create-leeson-request.dto';
import { addDays, eachDayOfInterval, format, getDate } from 'date-fns';
import { GetAvailabilityLessonRequestDto } from './dto/get-availability-lesson-request.dto';
import { LessonRepository, WeekofDaysLessonDate } from './lesson.repository';
import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';

import {
  MySQLToWeekOfDay,
  getAddDateTimeToFormat,
  getDateToFormat,
  getDayJs,
} from '@app/util/datetime.util';
import { LessonType } from './type/lesson.type';
import { CoachType } from './type/coach.type';
import { LessonDuration } from './type/lesson-duration.type';

export interface INextLessonDate {
  [date: string]: string[];
}
@Injectable()
export class LessonService {
  private dateTimes: string[] = [];
  private nextLessonDate: INextLessonDate = {};
  private nextWeekDayof = {};

  constructor(private lessonRepository: LessonRepository) {}

  // 레슨 신청 가능 일정은 해당 코치가 신청 불가능한 날짜로 하자
  // 1. 다음 7일 동안 레슨일 잡혀있을때
  // 2. 그 코치에 정기 레슨이 잡혀있는경우 해당 요일과 그시간대 전부 신청 안됨
  // 3. 주말 3개 평일 5개 코트가 있으므로 그 시간에에 코트가 여유가 있을때

  async getLessonAvailability(
    dto: GetAvailabilityLessonRequestDto,
    date?: string,
  ) {
    this.getLessonScheduleDate(date);
    await this.checkCoachLessonDate(dto.coachId, date);

    // 3. 주말과 평일 코트 사용 시간 필터링
    // 3-1 정기 레슨이랑 일반 레슨 계산 필요
    // 작업 안되어있음

    return {
      success: true,
      data: this.nextLessonDate,
    };
  }
  async createLesson(dto: CreateLessonRequestDto) {
    try {
      const password = await generateRandomString(6);
      const lessons = dto.toEntitys(getUUID(), password);

      await this.lessonRepository.save(lessons);
      return {
        success: true,
        data: {
          id: lessons[0].lessonId,
          password: lessons[0].password,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  async updateLesson(dto: UpdateLessonRequestDto) {
    try {
      // const lesson = await this.lessonRepository.findOne({
      //   where: {
      //     id: dto.lessonId,
      //   },
      // });
      // const {
      //   username,
      //   userPhone,
      //   coachId,
      //   lessonType,
      //   frequenciesType,
      //   durationsType,
      //   password,
      // } = dto.toUpdateEntitys();
      // lesson.update(
      //   username,
      //   userPhone,
      //   coachId,
      //   lessonType,
      //   frequenciesType,
      //   durationsType,
      //   password,
      // );
      // await this.lessonRepository.save(lesson);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteLesson(dto: CreateLessonRequestDto) {
    // const password = '1234';
    // try {
    //   const lesson = dto.toEntity(password);
    //   await this.lessonRepository.save(lesson);
    // } catch (error) {
    //   console.error(error);
    // }
  }

  async getByLessonId(dto: CreateLessonRequestDto) {
    // const password = '1234';
    // try {
    //   const lesson = dto.toEntity(password);
    //   await this.lessonRepository.save(lesson);
    // } catch (error) {
    //   console.error(error);
    // }
  }

  private filterLessonDate(
    lessonDates: WeekofDaysLessonDate[],
    lessonType: LessonType,
  ) {
    lessonDates.map((date) => {
      let lessonDate;
      if (lessonType === LessonType.HAND_ON_LESSON) {
        lessonDate = getDateToFormat(date.lessonStartTime, 'YYYY-MM-DD');
      } else {
        lessonDate = this.nextWeekDayof[date.dayOfWeek];
      }
      const lessonTime = getDateToFormat(date.lessonStartTime, 'HH:mm');
      const lessonMoreTime = getAddDateTimeToFormat(
        'HH:mm',
        30,
        'minute',
        date.lessonStartTime,
      );

      this.nextLessonDate[lessonDate] = this.nextLessonDate[lessonDate].filter(
        (time) => {
          // 1시간 동안 레슨이면 시작시간에 30분 더한 시간까지 제외
          if (
            date.durationsType === LessonDuration.ONE_HOURS &&
            time === lessonMoreTime
          ) {
            return false;
          }
          return time !== lessonTime;
        },
      );
      console.log(
        'this.lessonDate',
        lessonDate,
        this.nextLessonDate[lessonDate],
      );
    });
  }
  // this.nextLessonDate 만들기
  private getLessonScheduleDate(datetime?: string, isOneDay?: boolean) {
    const today = getDayJs(datetime);
    // datetime 이 있으면 입력된 타입 탐색
    const startLessonDate = isOneDay ? 0 : 1;
    const endLessonDate = isOneDay ? 0 : 7;
    let lessonDate = [];
    // 다음날 부터 당일 7일
    for (let i = startLessonDate; i <= endLessonDate; i++) {
      const addDay = today.add(i, 'day');
      const formatAddDay = addDay.format('YYYY-MM-DD').toString();
      lessonDate = [...lessonDate, formatAddDay];
      this.nextWeekDayof[MySQLToWeekOfDay(addDay.weekday())] = formatAddDay;
    }
    for (let i = 7; i <= 23; i++) {
      this.dateTimes = [...this.dateTimes, `${i}`.padStart(2, '0') + ':00'];
      if (i < 23) {
        this.dateTimes = [...this.dateTimes, `${i}`.padStart(2, '0') + ':30'];
      }
    }

    lessonDate.map((date) => {
      this.nextLessonDate[date] = [...this.dateTimes];
    });
  }

  private async checkCoachLessonDate(coach: CoachType, date: string) {
    const startWeek = getAddDateTimeToFormat(
      'YYYY-MM-DD',
      1,
      'day',
      date,
    ).toString();
    const endWeek = getAddDateTimeToFormat(
      'YYYY-MM-DD',
      8,
      'day',
      date,
    ).toString();
    // 날짜 생성
    // 1. 다음 7일 동안 레슨일 잡혀있을때
    const alreadyLessonDate = await this.lessonRepository.findLessonByCoachId(
      startWeek,
      endWeek,
      coach,
    );
    this.filterLessonDate(alreadyLessonDate, LessonType.HAND_ON_LESSON);
    // 2. 정기 레슨일경우 매주 해당 요일의 시간은 불가
    const regulrLessonDate =
      await this.lessonRepository.findLessonByRegulrCoachId(startWeek, coach);
    this.filterLessonDate(regulrLessonDate, LessonType.REGULAR_LESSON);
  }
}
