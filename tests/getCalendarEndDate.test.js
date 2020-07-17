import { getCalendarEndDate } from '../src/index';

describe('getCalendarEndDate', () => {
  it('should return end if not allDay', () => {
    const event = {
      end: new Date(2020, 3, 2, 13, 30),
      allDay: false,
    };
    expect(getCalendarEndDate(event)).toEqual(event.end);
  });
  it('should return end-of day if end if allDay', () => {
    const event = {
      end: new Date(2020, 3, 2, 13, 30),
      allDay: true,
    };
    expect(getCalendarEndDate(event)).toEqual(new Date(2020, 3, 2, 23, 59, 59, 999));
  });
});
