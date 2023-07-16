import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as weekofDay from 'dayjs/plugin/weekday';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(weekofDay);
dayjs.locale('ko'); // 한국어 로캘 설정
dayjs.tz.setDefault('Asia/Seoul'); // 시간대를 한국 시간대로 설정

export const getDayJs = (date?: string) => {
  return dayjs(date);
};

export const getDateToFormat = (dateTime: Date, format: string) => {
  return dayjs(dateTime).format(format);
};

export const getAddDateTimeToFormat = (
  format: string,
  num: number,
  util: dayjs.ManipulateType,
  dateTIme?: Date | null | string,
) => {
  return dayjs(dateTIme).add(num, util).format(format);
};

const MySQLWeekOfDay = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
  7: 0,
};

export const MySQLToWeekOfDay = (weekOfDay: number) =>
  MySQLWeekOfDay[weekOfDay];
