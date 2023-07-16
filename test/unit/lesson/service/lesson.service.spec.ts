import {
  generateRandomString,
  getUUID,
} from './../../../../src/util/random.util';
import { LessonService } from './../../../../src/lesson/lesson.service';
import { Test } from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';
import {
  LessonRepository,
  WeekofDaysLessonDate,
} from '@app/lesson/lesson.repository';
import { GetAvailabilityLessonRequestDto } from '@app/lesson/dto/get-availability-lesson-request.dto';
import { regulrLessonDate, seedLessonDate } from './seed.util';
import { Lesson } from '@app/entity/lesson.entity';
import { availabilityLessonExpect } from './expect/expect';
import { CreateLessonRequestDto } from '@app/lesson/dto/create-leeson-request.dto';
import { CoachType } from '@app/lesson/type/coach.type';
import { LessonType } from '@app/lesson/type/lesson.type';
import { LessonFrequency } from '@app/lesson/type/leeson-fre.type';
import { LessonDuration } from '@app/lesson/type/lesson-duration.type';

describe('LessonService', () => {
  let lessonService: LessonService;
  let lessonRepository: LessonRepository;

  beforeAll(async () => {
    const modules = await Test.createTestingModule({
      providers: [LessonService, LessonRepository],
    }).compile();
    lessonService = modules.get<LessonService>(LessonService);
    lessonRepository = modules.get<LessonRepository>(LessonRepository);
  });

  it('신청 가능한 테니스 레슨 일정 확인', async () => {
    // given
    const availabilityDto = GetAvailabilityLessonRequestDto.of(1, 2, 1);
    jest
      .spyOn(lessonRepository, 'findLessonByCoachId')
      .mockResolvedValue(seedLessonDate as Partial<WeekofDaysLessonDate[]>);

    jest
      .spyOn(lessonRepository, 'findLessonByRegulrCoachId')
      .mockResolvedValue(regulrLessonDate as Partial<WeekofDaysLessonDate[]>);

    // when
    const result = await lessonService.getLessonAvailability(
      availabilityDto,
      '2023-07-15',
    );
    //then
    expect(true).toBe(result.success);
    expect(availabilityLessonExpect).toStrictEqual(result.data);
  });

  it('테스트 1일 체험 레슨 신청하기 ', async () => {
    // given
    const username = 'jsshin';
    const userPhone = '010-0000-0000';
    const coachId = CoachType.KIM_CO;
    const lessonType = LessonType.HAND_ON_LESSON;
    const frequenciesType = LessonFrequency.WEEK_OF_ONE_DAY;
    const lessonDuration = LessonDuration.HALF_HOURS;

    const createLessonDto = CreateLessonRequestDto.of(
      username,
      userPhone,
      coachId,
      lessonType,
      frequenciesType,
      lessonDuration,
    );

    const response = {
      success: true,
      data: {
        id: getUUID(),
        password: generateRandomString(6),
      },
    };
    jest.spyOn(lessonRepository, 'save').mockResolvedValue(create);
    // when
    const result = await lessonService.createLesson(createLessonDto);

    expect(true).toBe(result.success);
  });
});
