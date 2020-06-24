import { addDays } from 'date-fns';

/**
 * ISString: as toISOString, but removes microseconds from UTC
 * @param {} date
 */
function ISODateString(date) {
  const yr = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const dt = String(date.getDate()).padStart(2, '0');
  return `${yr}-${mo}-${dt}T00:00:00Z`;
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
export function toUTCStrings(time) {
  const { start, end, allDay } = time;
  const result = {
    ...time,
    start: ISOString(start, allDay),
    end: end && ISOString(allDay ? addDays(end, 1) : end, allDay),
  };
  return result;
}

export default toUTCStrings;
