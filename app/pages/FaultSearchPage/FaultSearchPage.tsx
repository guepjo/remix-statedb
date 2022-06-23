import { PageHeader, PaginationProps, TablePaginationConfig } from "antd";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface";
import BasicTable from "~/components/BasicTable/BasicTable";
import EmployeesTable from "~/components/EmployeesTable/EmployeesTable";
import { FaultsTableColumn } from "~/components/EmployeesTable/TableColumns";
import { PageBreadcrumb } from "~/components/PageBreadcrumb";
import {
  DEFAULT_GET_FAULTS_QUERY_PARAMS,
  useGetFaultsQueryParams,
} from "~/hooks/useGetFaultsQueryParams";
type FaultSearchProps = {
  pageData: any;
  key: string;
  columns: FaultsTableColumn[];
  route?: string;
};

const FaultSearchPage = (props: FaultSearchProps) => {
  const [faultsQueryParams, setSearchParams] = useGetFaultsQueryParams();
  const totalFaultsCount = props.pageData?.page?.total_records || 0;

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
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
    <>
      <PageBreadcrumb route={"/search"} />

      <PageHeader
        title="Fault Search"
        // help={
        //   <>
        //     <p>
        //       <b>Fault Search</b> enables users to search for all faults from deadpool-api. <br />
        //       <br />
        //       For more info on how this page work, consider looking at the following links: <br />
        //       <a href={FMALRunbookURL.url} target="_blank" rel="noreferrer">
        //         <code>{FMALRunbookURL.shortText}</code>
        //       </a>
        //     </p>
        //     <p>
        //       <a href={getFMALAPIDocsURL().url} target="_blank" rel="noreferrer">
        //         <code>API docs</code>
        //       </a>
        //     </p>
        //   </>
        // }
      />

      <EmployeesTable
        data={props.pageData}
        key="basictable"
        tablePagination={tablePaginationSettings}
        handleTableChange={handleTableChange}
        columns={props.columns}
      />
    </>
  );
};

export default FaultSearchPage;
