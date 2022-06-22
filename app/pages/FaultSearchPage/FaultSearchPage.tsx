import BasicTable from "~/components/BasicTable/BasicTable";
import EmployeesTable from "~/components/EmployeesTable/EmployeesTable";
type FaultSearchProps = {
  pageData: any;
  key: string;
};

const FaultSearchPage = (props: FaultSearchProps) => {
  console.log("fault page", props.pageData);
  return <EmployeesTable data={props.pageData} key="basictable" />;
};

export default FaultSearchPage;
