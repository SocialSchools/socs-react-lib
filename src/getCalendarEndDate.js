import { endOfDay } from "date-fns";

function getCalendarEndDate(obj) {
  const date = obj.end;
  return obj.allDay ? endOfDay(date) : date;
}

export default getCalendarEndDate;
