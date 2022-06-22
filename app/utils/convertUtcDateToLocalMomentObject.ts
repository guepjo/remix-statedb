import moment, { Moment } from 'moment';

/**
 * @description
 * Takes a UTC date formatted string and returns the date as a
 * Moment object with the clients local time.
 */

export const convertUtcDateToLocalMomentObject = (UTCDateString: string): Moment => {
  const utcDate = moment.utc(UTCDateString).toDate();

  return moment(utcDate);
};
