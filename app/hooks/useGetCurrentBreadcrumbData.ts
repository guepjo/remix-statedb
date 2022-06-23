import { useLocation } from "react-router-dom";
import { isValidLinkedInHostname } from "~/utils";

export const useGetCurrentBreadcrumbData = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const hostname = params.get("hostname") || "none";
  const isValidHostname = isValidLinkedInHostname(hostname);

  return { pathSnippets, hostname, isValidHostname };
};
