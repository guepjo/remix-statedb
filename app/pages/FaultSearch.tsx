import BasicTable from "~/components/AdvancedTable/table";

type FaultSearchProps = {
  pageData: any;
  key: string;
};

const FaultSearch = (props: FaultSearchProps) => {
  console.log("fault page", props.pageData);
  return <BasicTable data={props.pageData} key="basictable" />;
};

export default FaultSearch;
