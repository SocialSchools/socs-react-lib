import { subDays } from 'date-fns';

/**
 * convert utc string to Date object
 * @param {*} str
 * @param {*} allDay
 */
function stringToTime(str, allDay) {
  if (typeof str === 'string' && allDay) {
    const [yr, mo, dt] = str.split(/\D+/, 3).map(Number);
    return new Date(yr, mo - 1, dt); // month is 0-based
  }
  return new Date(str);
}

/**
 * Convert UTC strings from backend to Date times
 * @param time
 * @returns {{start: *|Date, end: *|Date, allDay: boolean}}
 */
function fromUTCStrings(time, forceAllDay) {
  let allDay = forceAllDay || time.allDay;
  if (allDay === undefined) {
    const midnight = 'T00:00:00Z';
    allDay = time.start.endsWith(midnight) && (!time.end || time.end.endsWith(midnight));
  }
  const start = stringToTime(time.start, allDay);
  let end = time.end && stringToTime(time.end, allDay);
  if (end && allDay) {
    end = subDays(end, 1);
  }
  return {
    ...time,
    start,
    end: time.end && (end < start ? start : end),
    allDay,
  };
}

export default fromUTCStrings;
