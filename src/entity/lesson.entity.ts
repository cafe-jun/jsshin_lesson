import { AuditingFieldEntity } from '@app/common/core/auditing-field.entity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lesson extends AuditingFieldEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('uuid', {
    name: 'lessonId',
    comment: '레슨 Id',
  })
  lessonId: string;

  @Column('varchar', {
    name: 'lessonType',
    length: 255,
    comment: '체험레슨/정기레슨',
  })
  lessonType: number;

  @Column('varchar', {
    name: 'frequenciesType',
    length: 255,
    comment: '정기레슨 주 1회/2회,3회',
  })
  frequenciesType: number;

  @Column('varchar', {
    name: 'durationsType',
    length: 255,
    comment: '30분,1시간',
  })
  durationsType: number;

  @Index()
  @Column('timestamp', { name: 'lessonStartTime' })
  lessonStartTime: Date;

  @Index()
  @Column('timestamp', { name: 'lessonEndTime' })
  lessonEndTime: Date;

  @Index()
  @Column('int', { name: 'coachId' })
  coachId: number;

  @Column('varchar', { name: 'password' })
  password: string;

  @Column('int', { name: 'username' })
  username: string;

  @Column('int', { name: 'userPhone' })
  userPhone: string;

  static of(
    username: string,
    userPhone: string,
    coachId: number,
    lessonType: number,
    frequenciesType: number,
    durationsType: number,
    password: string,
    lessonStartTime: Date,
    lessonEndTime: Date,
    lessonId: string,
  ): Lesson {
    const lesson = new Lesson();
    lesson.username = username;
    lesson.userPhone = userPhone;
    lesson.coachId = coachId;
    lesson.lessonType = lessonType;
    lesson.frequenciesType = frequenciesType;
    lesson.durationsType = durationsType;
    lesson.password = password;
    lesson.lessonStartTime = lessonStartTime;
    lesson.lessonEndTime = lessonEndTime;
    lesson.lessonId = lessonId;
    return lesson;
  }

  update(
    username: string,
    userPhone: string,
    coachId: number,
    lessonType: number,
    frequenciesType: number,
    durationsType: number,
    password: string,
  ): void {
    const lesson = new Lesson();
    lesson.username = username;
    lesson.userPhone = userPhone;
    lesson.coachId = coachId;
    lesson.lessonType = lessonType;
    lesson.frequenciesType = frequenciesType;
    lesson.durationsType = durationsType;
    lesson.password = password;
  }
}
