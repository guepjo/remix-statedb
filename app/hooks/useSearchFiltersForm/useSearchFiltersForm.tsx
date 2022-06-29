import React from "react";
import { FormInstance, notification } from "antd";

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
  formRef: React.RefObject<HTMLFormElement>;
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
export const useSearchFiltersForm = ({
  formInstance,
  formRef,
}: useSearchFiltersFormProp) => {
  const [isSearchFiltersFormOpen, setIsSearchFiltersFormOpen] =
    React.useState(false);

  React.useEffect(() => {
    // @ts-ignore
    window.formInstance = formInstance;
  }, []);

  /**
   * @description
   * Clears the form fields on the SearchFilter Form.
   */
  const clearForm = () => {
    const formFields = Object.keys(DEFAULT_FORM_VALUES);
    formRef.current?.reset();
    notification.info({
      message: "Cleared form filters",
    });
    toggleSearchFiltersMenu();
  };

  /**
   * @description
   * This opens/closes the search filter form.
   */
  const toggleSearchFiltersMenu = () => {
    formInstance.resetFields();
    setIsSearchFiltersFormOpen(!isSearchFiltersFormOpen);
  };

  return {
    isSearchFiltersFormOpen,
    toggleSearchFiltersMenu,
    clearForm,
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
