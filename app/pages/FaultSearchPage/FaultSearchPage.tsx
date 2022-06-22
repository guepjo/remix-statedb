import React from "react";
import { FaultsTable } from "~/components/FaultsTable";
import { TABLE_COLUMNS } from "~/components/FaultsTable/TableColumns";
import { useGetFaults } from "~/hooks";
import { FMALRunbookURL, getFMALAPIDocsURL } from "~/utils";
import { notification, PaginationProps, TablePaginationConfig } from "antd";
import {
  SorterResult,
  FilterValue,
  TableCurrentDataSource,
} from "antd/lib/table/interface";
import { CMAPIData } from "~/types";
import {
  DEFAULT_GET_FAULTS_QUERY_PARAMS,
  useGetFaultsQueryParams,
} from "~/hooks/useGetFaultsQueryParams";

type CmStatusTypes = "open" | "closed" | "all";

/**
 * @description
 * This page serves as the homepage and is the primary interface for viewing faults.
 */
const FaultSearchPage = () => {
  const [faultsQueryParams, setSearchParams] = useGetFaultsQueryParams();
  const getFaultsInfo = useGetFaults({ ...faultsQueryParams }, true);
  const tableData = getFaultsInfo.data?.data || [];
  const tableHasNoSearchResults =
    getFaultsInfo.data &&
    getFaultsInfo.isSuccess &&
    getFaultsInfo.data.data.length < 1;
  const totalFaultsCount = getFaultsInfo.data?.page?.total_records || 0;
  const isTableDataLoading =
    getFaultsInfo?.isLoading || getFaultsInfo.isFetching;

  /**
   * @description
   * Callback executed when pagination, filters or sorter is changed
   * @docs
   * https://ant.design/components/table/#Table
   */
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<CMAPIData> | SorterResult<CMAPIData>[],
    extra: TableCurrentDataSource<CMAPIData>
  ): void => {
    // Handle Sort Action
    if (extra.action === "sort") {
      const sortOrder = (sorter as any).order === "descend" ? "desc" : "asc";

      setSearchParams({
        ...faultsQueryParams,
        sort_by: (sorter as any).columnKey,
        sort_order: sortOrder,
      });
    }
    // Handle Pagination click action
    else if (extra.action === "paginate") {
      const { current = 1, pageSize } = pagination;

      setSearchParams({
        ...faultsQueryParams,
        status: faultsQueryParams.status as string,
        page_size:
          pageSize?.toString() || DEFAULT_GET_FAULTS_QUERY_PARAMS.page_size,
        start_page:
          current?.toString() || DEFAULT_GET_FAULTS_QUERY_PARAMS.start_page,
      });
    }
  };

  /**
   * @description
   * Pagination settings for the ant design table.
   */
  const tablePaginationSettings: PaginationProps = {
    pageSizeOptions: (() => {
      const sortedPageSizeOptions = [
        "10",
        "25",
        "50",
        "100",
        faultsQueryParams.page_size as string,
      ].sort((a, b) => Number(a) - Number(b));
      const filteredPageSizeOptions = [...new Set(sortedPageSizeOptions)]; // This will remove any duplicates in pageSizeOptions

      return filteredPageSizeOptions;
    })(),
    size: "small",
    showSizeChanger: true,
    total: totalFaultsCount,
    // We need to convert our query params to integers for our Table's pagination
    defaultCurrent: parseInt(
      faultsQueryParams.start_page as string,
      10
    ) as number,
    current: parseInt(faultsQueryParams.start_page as string, 10) as number,
    pageSize: parseInt(faultsQueryParams.page_size as string, 10) as number,
  };

  /**
   * @description
   * Resets the url query params to their defaults values,
   * which subsequently will trigger a re-render of the table
   */
  const handleResetSearchFilters = () => {
    setSearchParams(DEFAULT_GET_FAULTS_QUERY_PARAMS);
    notification.info({
      message: "Cleared search filters",
    });
    handleRefresh();
  };

  /**
   * @description
   * Refetches the data for the page
   */
  const handleRefresh = () => {
    getFaultsInfo.refetch();
  };

  /**
   * @description
   * Handles the change of the CM status to display new faults that match the status.
   * Notes:
   * 1. reset the `status` to the new one that is selected
   * 2. reset `start_page` param value to avoid fetching a page that doesn't exist under this new CM status.
   */
  const handleCMStatusSelectChange = (value: CmStatusTypes) => {
    setSearchParams({
      ...faultsQueryParams,
      status: value,
      start_page: DEFAULT_GET_FAULTS_QUERY_PARAMS.start_page,
    });
  };

  if (tableHasNoSearchResults) {
    notification.info({
      message: "No results found",
      placement: "top",
    });
  }
  console.log("Inside FaultSearchPage");

  return (
    <>
      {/* <PageBreadcrumb />

      <PageHeader
        title="Fault Search"
        help={
          <>
            <p>
              <b>Fault Search</b> enables users to search for all faults from
              deadpool-api. <br />
              <br />
              For more info on how this page work, consider looking at the
              following links: <br />
              <a href={FMALRunbookURL.url} target="_blank" rel="noreferrer">
                <code>{FMALRunbookURL.shortText}</code>
              </a>
            </p>
            <p>
              <a
                href={getFMALAPIDocsURL().url}
                target="_blank"
                rel="noreferrer"
              >
                <code>API docs</code>
              </a>
            </p>
          </>
        }
      /> */}

      <FaultsTable
        isLoading={isTableDataLoading}
        columns={TABLE_COLUMNS}
        dataSource={tableData}
        cmStatus={faultsQueryParams.status as CmStatusTypes}
        handleTableChange={handleTableChange}
        handleRefreshTableData={handleRefresh}
        handleCMStatusSelectChange={handleCMStatusSelectChange}
        handleResetSearchFilters={handleResetSearchFilters}
        tablePagination={tablePaginationSettings}
        totalSearchResults={totalFaultsCount}
      />
    </>
  );
};

export default FaultSearchPage;
