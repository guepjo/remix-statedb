import { UseQueryOptions } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { FaultAPIResponse } from 'types';
import { exportFaultsPageTableData } from 'hooks/useExportFaultsPageTableData/utils/exportFaultsPageTableData';
import { notification } from 'antd';
import { GetFaultsQueryParams, useGetFaults } from 'hooks/useGetFaults';
import { RQ_QUERY_KEY } from 'utils';
import { FaultsTableColumn } from 'components/FaultsTable/TableColumns';

export type TableExportOption = 'current_view' | 'everything';

const CURRENT_VIEW_DEFAULT_PAGE_SIZE = 10;
const CURRENT_VIEW_DEFAULT_START_PAGE_NUMBER = 1;
const ALL_FAULTS_PAGE_SIZE = 100000; // Pass a very large number back to the backend; this way we don't need to calculate or do some complicated logic to retrieve the exact number
const ALL_FAULTS_START_PAGE_NUMBER = 1;

/**
 * @description
 * Downloads the table data as a CSV file.
 * How does this work?
 * When the user clicks the export button, we grab the query param values
 * from the URL and fetch faults using that information.
 */
export const useExportFaultsPageTableData = (
  exportOption: TableExportOption,
  tableColumns: FaultsTableColumn[],
  rqConfig: UseQueryOptions<FaultAPIResponse> = {},
) => {
  const [searchParams] = useSearchParams();
  const isFullTableExport = exportOption === 'everything';
  const isCurrentViewExport = exportOption === 'current_view';
  const faultsQueryParams: GetFaultsQueryParams = {};

  if (isFullTableExport) {
    faultsQueryParams.page_size = ALL_FAULTS_PAGE_SIZE;
    faultsQueryParams.start_page = ALL_FAULTS_START_PAGE_NUMBER;
  } else if (isCurrentViewExport) {
    faultsQueryParams.page_size = Number(searchParams.get('page_size')) || CURRENT_VIEW_DEFAULT_PAGE_SIZE;
    faultsQueryParams.start_page = Number(searchParams.get('start_page')) || CURRENT_VIEW_DEFAULT_START_PAGE_NUMBER;
  }
  const faultsInfo = useGetFaults(faultsQueryParams, false, {
    ...rqConfig,
    queryKey: [RQ_QUERY_KEY.useExportFaultsPageTableData, exportOption],
    keepPreviousData: false,
    cacheTime: 0, // Required: onSuccess will not trigger if there is data in the cache & cache is not stale
    staleTime: 0, // Required: onSuccess will not trigger if there is data in the cache & cache is not stale
    onSuccess: (data) => {
      const tableData = data.data;

      exportFaultsPageTableData(tableData, tableColumns);
      notification.success({
        message: 'Export Successful',
      });
    },
    onError: (error) => {
      console.error(`[${RQ_QUERY_KEY.useExportFaultsPageTableData}]`, error);
      notification.error({
        message: 'Export Unsuccessful',
      });
    },
  });

  return faultsInfo;
};
