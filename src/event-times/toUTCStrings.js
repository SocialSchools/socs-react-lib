import { addDays, format } from 'date-fns';

/**
 * ISString: as toISOString, but removes microseconds from UTC
 * @param {} date
 */
export function ISODateString(date) {
  const dateStr = format(date, 'yyyy-MM-dd');
  return `${dateStr}T00:00:00.000Z`;
}

/**
 * ISString: as toISOString, but removes microseconds from UTC
 * @param {} date
 */
function ISOString(date, allDay) {
  return allDay
    ? ISODateString(date)
    : date.toISOString().replace(/\.0+Z$/, 'Z');
}

/**
 * Convert times to UTC strings for backend
 * @param {{start: Date, end: Date, allDay: boolean}}
 * @returns {{start: string, end: string, allDay: boolean}}
 */
export function toUTCStrings(time, forceAllDay) {
  const { start, end } = time;
  const allDay = forceAllDay || time.allDay;
  const result = {
    ...time,
    start: ISOString(start, allDay),
    end: end && ISOString(allDay ? addDays(end, 1) : end, allDay),
  };
  return result;
}

export default toUTCStrings;
