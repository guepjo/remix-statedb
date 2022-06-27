import React from "react";
import { FormInstance, notification } from "antd";
// import { useAuth } from "context";
import { GetFaultsQueryParams, useGetFaults } from "~/hooks/useGetFaults";
// import { useGetFaultsMetaData } from "~/hooks/useGetFaultsMetaData";
import { useGetFaultsQueryParams } from "~/hooks/useGetFaultsQueryParams";
import { covertQueryParamsToFormValues, formatFormDataOnSubmit } from "./utils";

/**
 * @description
 * Default form values, useful for when we are resetting the form.
 */
export const DEFAULT_FORM_VALUES = {
  name: "",
  department: "",
  age: "",
};

type useSearchFiltersFormProp = {
  formInstance: FormInstance<any>;
  data: any;
};

/**
 * @description
 * This hooks main responsbility is to:
 * #1
 * Grabs the query params values from the url & convert them into
 * values that can be used to prefill the search filter's form input/select fields.
 * For example, the `date_filter` value from the URL is a string that needs
 * to be converted into a momentjs object for the date range picker to consume.
 *
 * 2.
 * The lifecycle (submit, reset, open, close) and business logic for the
 * form behavior is contained in this hook.
 */
export const useSearchFiltersForm = (props: useSearchFiltersFormProp) => {
  const faultsMetaDataInfo = props.data; //useGetFaultsMetaData();
  // const { currentUser } = useAuth();
  const [urlSearchParamsMap] = useGetFaultsQueryParams();
  const [isSearchFiltersFormOpen, setIsSearchFiltersFormOpen] =
    React.useState(false);
  const [isGetFaultsHookEnabled, setIsGetFaultsHookEnabled] =
    React.useState(false);
  // const [isMyFaultsSwitchButtonEnabled, setIsMyFaultsSwitchButtonEnabled] =
  //   React.useState(urlSearchParamsMap.created_by === currentUser.username);
  const [faultsQueryParams, setFaultsQueryParams] = React.useState(
    {} as GetFaultsQueryParams
  );
  const formattedFormValuesMap =
    covertQueryParamsToFormValues(urlSearchParamsMap);

  useGetFaults(faultsQueryParams, true, props.data, {
    enabled: isGetFaultsHookEnabled,
  });

  // if (isMyFaultsSwitchButtonEnabled) {
  //   formattedFormValuesMap.created_by = currentUser.username;
  // }
  /**
   * @description
   * This creates a list of query-param key values that are in a specific
   * format for usage with Ant's Form API
   * @example
   * https://ant.design/components/form/#FormInstance
   */
  const formFieldKeyValuePairs = Object.entries(formattedFormValuesMap).map(
    (formField) => {
      return {
        name: formField[0],
        value: formField[1],
      };
    }
  );

  /**
   * @description
   * Clears the form fields on the SearchFilter Form.
   */
  const clearForm = () => {
    const formFields = Object.keys(DEFAULT_FORM_VALUES);

    props.formInstance.resetFields(formFields);
    notification.info({
      message: "Cleared form filters",
    });
  };

  /**
   * @description
   * This opens/closes the search filter form.
   */
  const toggleSearchFiltersMenu = () => {
    props.formInstance.resetFields();
    setIsSearchFiltersFormOpen((prevState) => !prevState);
    setIsGetFaultsHookEnabled((prevState) => !prevState);
  };

  /**
   * @description
   * This is called when the form's submit event is triggered.
   */
  const handleFormSubmit = (newFaultFormValues: GetFaultsQueryParams) => {
    const formattedNewFaultFormValues =
      formatFormDataOnSubmit(newFaultFormValues);
    console.log("handle form submit", formattedNewFaultFormValues);

    setFaultsQueryParams((prevState) => ({
      ...prevState,
      ...formattedNewFaultFormValues,
    }));
    setIsGetFaultsHookEnabled((prevState) => !prevState);
    toggleSearchFiltersMenu();
  };

  /**
   * @description
   * Prepopulate the form fields with the corresponding query param
   * values that were passed in the URL.
   */
  props.formInstance.setFields(formFieldKeyValuePairs);

  return {
    isSearchFiltersFormOpen,
    setIsSearchFiltersFormOpen,
    isGetFaultsHookEnabled,
    setIsGetFaultsHookEnabled,
    // isMyFaultsSwitchButtonEnabled,
    // setIsMyFaultsSwitchButtonEnabled,
    toggleSearchFiltersMenu,
    faultsQueryParams,
    setFaultsQueryParams,
    clearForm,
    // currentUser,
    handleFormSubmit,
    autocompleteList: {
      // applications: faultsMetaDataInfo.data?.applications || [],
      // checkIds: faultsMetaDataInfo.data?.checkIds || [],
      // detectionSystems: faultsMetaDataInfo.data?.detectionSystems || [],
      // faultTypes: faultsMetaDataInfo.data?.faultTypes || [],
      // teams: faultsMetaDataInfo.data?.teams || [],
    },
    DEFAULT_FORM_VALUES,
  };
};
