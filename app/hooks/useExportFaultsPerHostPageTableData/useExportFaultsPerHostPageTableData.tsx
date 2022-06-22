import { useMutation } from 'react-query';
import { notification } from 'antd';
import { CMByHostnameAPIData } from 'types';
import { FaultsPerHostTableColumn } from 'components/FaultsPerHostTable/TableColumns';
import { exportFaultsPerHostPageTableData } from './utils/exportFaultsPerHostPageTableData';

/**
 * @description
 * Downloads the table data as a CSV file.
 */
export const useExportFaultsPerHostPageTableData = () => {
  const exportTableDataMutation = useMutation({
    /**
     * @description
     * This function, when called will download the CSV file for the data table.
     */
    mutationFn: async ({
      tableColumns = [],
      tableData = [],
    }: {
      tableColumns: FaultsPerHostTableColumn[];
      tableData: CMByHostnameAPIData[];
    }) => {
      try {
        exportFaultsPerHostPageTableData(tableData, tableColumns);
        notification.success({
          message: 'Export Successful',
        });
      } catch {
        notification.error({
          message: 'Export Unsuccessful',
        });
      }
    },
  });

  return exportTableDataMutation;
};
