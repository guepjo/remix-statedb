import { PaginationProps } from "antd";
import BasicTable from "~/components/BasicTable/BasicTable";
import EmployeesTable from "~/components/EmployeesTable/EmployeesTable";
import { useGetFaultsQueryParams } from "~/hooks/useGetFaultsQueryParams";
type FaultSearchProps = {
  pageData: any;
  key: string;
};

const FaultSearchPage = (props: FaultSearchProps) => {
  const [faultsQueryParams, setSearchParams] = useGetFaultsQueryParams();
  const totalFaultsCount = props.pageData?.page?.total_records || 0;

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
  console.log("fault page", props.pageData);
  return (
    <EmployeesTable
      data={props.pageData}
      key="basictable"
      tablePagination={tablePaginationSettings}
    />
  );
};

export default FaultSearchPage;
