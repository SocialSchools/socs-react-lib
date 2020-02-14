# event-times

## How to install

```
npm install --save SocialSchools/socs-event-times
```

or

```
yarn add SocialSchools/socs-event-times
```

## How to use

As soon as you fetch data from the server, convert dates using the `fromUTCStrings` function:

```
import { fromUTCStrings} from 'socs-event-times';
...
// For a single event
const event = fromUTCStrings(fetchSingleEvent());
// For a list of events
const events = fetchEventsFromServer().map(fromUTCStrings);
```

When sending an event to the server, use `toUTCStrings`:
```
import { toUTCStrings} from 'socs-event-times';
...
request({
    method: 'POST',
    url: myPostUrl,
    body: JSON.stringify(toUTCStrings(event)),
  }
)
```
When using react-big-calendar, use the `getCalendarEndDate` function:
```
import { getCalendarEndDate } from 'socs-event-times';
...
  <Calendar endAccessor={getCalendarEndDate} ... />

```


## Convert to/from server time

Converts events times from server as UTC string to JS Date objects

```
server-event: {
  start: <string>,
  end: <string>,
  allDay: <boolan>
}
```
If `allDay`, then `end` is the end of the last day/the beginning of the next day, so for a single-day event this looks like:
```
{
   start: "2020-04-10T00:00:00Z",
   end: "2020-04-11T00:00:00Z",
   allDay: true
}
```
If `allDay` is `undefined`, it will be set to `true` of both `start` and `end` end with `T00:00:00Z`.

In JS:
```
browser-event: {
  start: <Date>,
  end: <Date>,
  allDay: <boolean>
}
```
Since many JS and React components show the beginning of the last day for `end` if the event is `allDay`, one day has to be subtracted from `end`:
```
{
   start: "2020-04-10T00:00:00Z",
   end: "2020-04-10T00:00:00Z",
   allDay: true
}
```

## big-calendar issues

react-big-calendar is not consistent in this: for showing an event, end is supposed to be the start of the day after (https://codesandbox.io/s/7oj4w4vzlq), but when creating an event by dragging in month view, end is the start of the last day. In addition, there is the Monday-bug (intljusticemission/react-big-calendar: Issue #680). It seems to work fine if the end of the event is set to the endOfDay of the last day.

Library based on https://github.com/hodgef/js-library-boilerplate-basic