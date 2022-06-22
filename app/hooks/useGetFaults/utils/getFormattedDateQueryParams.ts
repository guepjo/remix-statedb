import { Moment } from 'moment';

/**
 * @description
 * Converts momentJS date object(s) into a string value that we can pass to API call.
 *
 * Note:
 * This primarily exists to convert the momentJS objects that the search filter form
 * gives back to us on form submit. Before submitting our `date_filter` query to the
 * backend this conversion must
 */
export const getFormattedDateQueryParams = ({
  dateFilterAfter,
  dateFilterBefore,
  dateFilterBy = 'created',
}: {
  dateFilterAfter?: Moment;
  dateFilterBefore?: Moment;
  dateFilterBy: string;
}): string => {
  // if user is searching between dates
  if (dateFilterAfter && dateFilterBefore) {
    const startDateToUTC = dateFilterAfter.utc().format('YYYY-MM-DD HH:mm:ss');
    const endDateToUTC = dateFilterBefore.utc().format('YYYY-MM-DD HH:mm:ss');

    return JSON.stringify({
      by: dateFilterBy,
      qualifier: 'between',
      value: [startDateToUTC, endDateToUTC],
    });
  }

  // if user is searching before date
  if (dateFilterBefore && !dateFilterAfter) {
    const endDateToUTC = dateFilterBefore.utc().format('YYYY-MM-DD HH:mm:ss');

    return JSON.stringify({
      by: dateFilterBy,
      qualifier: 'before',
      value: endDateToUTC,
    });
  }

  // if user is searching after date
  if (!dateFilterBefore && dateFilterAfter) {
    const startDateToUTC = dateFilterAfter.utc().format('YYYY-MM-DD HH:mm:ss');

    return JSON.stringify({
      by: dateFilterBy,
      qualifier: 'after',
      value: startDateToUTC,
    });
  }

  return '';
};
