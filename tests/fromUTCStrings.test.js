/* global describe it expect */
import { fromUTCStrings } from '../src/index';

describe('toUTCString', () => {
  it('Converts start/end from UTC string for allDay event', () => {
    const event = {
      start: '2020-04-01T00:00:00Z',
      end: '2020-04-03T00:00:00Z',
      allDay: true,
    };
    expect(fromUTCStrings(event)).toEqual({
      start: new Date(2020, 3, 1),
      end: new Date(2020, 3, 2),
      allDay: true,
    });
  });
  it('Should ensure end is not before start', () => {
    const event = {
      start: '2020-04-01T00:00:00Z',
      end: '2020-04-01T00:00:00Z',
      allDay: true,
    };
    expect(fromUTCStrings(event)).toEqual({
      start: new Date(2020, 3, 1),
      end: new Date(2020, 3, 1),
      allDay: true,
    });
  });
  it('Converts start/end from UTC string for non-allDay event', () => {
    const event = {
      start: '2020-04-01T10:30:00Z',
      end: '2020-04-02T11:30:00Z',
      allDay: false,
    };
    expect(fromUTCStrings(event)).toEqual({
      start: new Date('2020-04-01T10:30:00Z'),
      end: new Date('2020-04-02T11:30:00Z'),
      allDay: false,
    });
  });
  it('Converts start/end from UTC string for non-allDay event with open end', () => {
    const event = {
      start: '2020-04-01T10:30:00Z',
      allDay: false,
    };
    expect(fromUTCStrings(event)).toEqual({ start: new Date('2020-04-01T10:30:00Z'), allDay: false });
  });
  it('Converts start from UTC string for allDay event with open end', () => {
    const event = {
      start: '2020-04-01T00:00:00Z',
      allDay: true,
    };
    expect(fromUTCStrings(event)).toEqual({ start: new Date(2020, 3, 1), allDay: true });
  });
  it('Converts start/end from UTC string if times are both midnight', () => {
    const event = {
      start: '2020-04-01T00:00:00Z',
      end: '2020-04-03T00:00:00Z',
    };
    expect(fromUTCStrings(event)).toEqual({
      start: new Date(2020, 3, 1),
      end: new Date(2020, 3, 2),
      allDay: true,
    });
  });
  it('Converts start/end from UTC string if times are not midnight', () => {
    const event = {
      start: '2020-04-01T10:30:00Z',
      end: '2020-04-02T11:30:00Z',
    };
    expect(fromUTCStrings(event)).toEqual({
      start: new Date('2020-04-01T10:30:00Z'),
      end: new Date('2020-04-02T11:30:00Z'),
      allDay: false,
    });
  });
});
