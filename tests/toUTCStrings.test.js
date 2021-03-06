/* global describe it expect */
import { toUTCStrings } from '../src/index';

describe('toUTCString', () => {
  it('Converts start/end to UTC string for allDay event', () => {
    const event = {
      start: new Date(2020, 3, 1),
      end: new Date(2020, 3, 2),
      allDay: true,
    };
    expect(toUTCStrings(event)).toEqual({ start: '2020-04-01T00:00:00Z', end: '2020-04-03T00:00:00Z', allDay: true });
  });
  it('Converts start/end to UTC string for non-allDay event', () => {
    const event = {
      start: new Date(2020, 3, 1, 12, 30),
      end: new Date(2020, 3, 2, 13, 30),
      allDay: false,
    };
    expect(toUTCStrings(event)).toEqual({ start: '2020-04-01T10:30:00Z', end: '2020-04-02T11:30:00Z', allDay: false });
  });
  it('Converts start/end to UTC string for non-allDay event with open end', () => {
    const event = {
      start: new Date(2020, 3, 1, 12, 30),
      allDay: false,
    };
    expect(toUTCStrings(event)).toEqual({ start: '2020-04-01T10:30:00Z', allDay: false });
  });
});
