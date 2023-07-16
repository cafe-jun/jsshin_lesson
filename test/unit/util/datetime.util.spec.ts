import { getDayJs } from './../../../src/util/datetime.util';
import * as dayjs from 'dayjs';
describe('datetime util test', () => {
  it('getDayJs 로 날짜 받아오기', async () => {
    //given
    const datetime = '2023-06-23';
    const dayjsTime = dayjs(datetime);
    // when
    const result = getDayJs(datetime);
    // then
    expect(result).toStrictEqual(dayjsTime);
  });

  it('getDateToFormat로 날짜 받아오기', async () => {
    //given
    const datetime = '2023-06-23';
    const dayjsTime = dayjs(datetime);
    // when
    const result = getDayJs(datetime);
    // then
    expect(result).toStrictEqual(dayjsTime);
  });
});
