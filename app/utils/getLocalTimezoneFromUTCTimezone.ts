import moment from 'moment';

/**
 * @description Converts to UTC time
 *  Moment.js – UTC to Local timezone: https://stackoverflow.com/a/32540840
 *
 */
export const getLocalTimezoneFromUTCTimezone = (utcDate: string): string => {
  const date = moment(utcDate).utc().format('YYYY-MM-DD HH:mm:ss');
  const stillUtc = moment.utc(date).toDate();
  const localTime = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

  return localTime;
};
