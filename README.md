# event-times
Convert to/from server time

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