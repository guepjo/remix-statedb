import { GetFaultsQueryParams } from 'hooks/useGetFaults';
import { cloneDeep } from 'lodash';

/**
 * @description
 * This function is used right after the user submits the search filter form.
 * Some values on the forms don't map directly to the URL.
 */
export const formatFormDataOnSubmit = (onSubmitFormData: GetFaultsQueryParams) => {
  const formattedFormData = cloneDeep(onSubmitFormData);

  /**
   * The date picker in search form is represented by more than one form field.
   * That is, `date_filter` from the URL doesn't have 1 single corresponding form field, instead
   * we have 3 fields to represent it
   *  - date_filter_by (created | updated)
   *  - date_filter_before
   *  - date_filter_after
   *
   * When you submit a form, the form field label is what's used to associate a form's value.
   *
   * Below we are saying:
   * If the date_filter_by checkbox is not marked, we can assume an empty date_filter.
   * We need to set `date_filter` to empty so that in the case we do have a `date_filter`
   * value in the URL already, we can remove it.
   */
  if (onSubmitFormData.date_filter_by === '') {
    formattedFormData.date_filter = '';
  }

  // When a search is made, make sure redirect user to first page of the new search query
  formattedFormData.start_page = 1;

  return formattedFormData;
};
