import BasicTable from "~/components/table";

type FaultSearchProps = {
  pageData: any;
  key: string;
};

const FaultSearchPage = (props: FaultSearchProps) => {
  console.log("fault page", props.pageData);
  return <BasicTable data={props.pageData} key="basictable" />;
};

export default FaultSearchPage;
