import React from "react";
import { RightOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { Link } from "react-router-dom";
import { getOr, startCase } from "lodash/fp";
// import { CopyToClipboardButton } from "components";
import { useGetCurrentBreadcrumbData } from "~/hooks";
import "./PageBreadcrumb.css";

type PageBreadcrumbProp = {
  route: string;
};

const HOST_INFO_TOOLS_BASE_URL =
  "https://host-information-tool.corp.linkedin.com";

const PageBreadcrumb = (prop: PageBreadcrumbProp) => {
  const { pathSnippets, hostname, isValidHostname } =
    useGetCurrentBreadcrumbData();

  const pathToNameMap = {
    search: "Fault Search",
    host: hostname,
  };

  return (
    <section className="PageBreadcrumb" data-testid="Breadcrumb">
      <AntBreadcrumb separator={<RightOutlined />}>
        <AntBreadcrumb.Item key="home">
          <HomeOutlined style={{ marginRight: "1rem" }} />
        </AntBreadcrumb.Item>

        {pathSnippets.map((path: string, index: number) => {
          // const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
          // const isLast = pathSnippets.length - 1 === index;
          // const name = getOr(path, path, pathToNameMap);
          // console.log("url", url);
          // console.log("isLast", isLast);

          const formattedName = !prop.route.includes("search") ? (
            <>
              <span style={{ fontWeight: 500, marginRight: ".45rem" }}>
                Hostname:
              </span>
              {isValidHostname && (
                <>
                  <a
                    style={{ color: "#1A90FF" }}
                    rel="noreferrer"
                    target="_blank"
                    href={`${HOST_INFO_TOOLS_BASE_URL}/?host=${hostname}`}
                  >
                    {hostname}
                  </a>
                  {/* <CopyToClipboardButton stringToCopy={hostname} /> */}
                </>
              )}
            </>
          ) : (
            startCase("Fault" + prop.route)
          );

          return (
            <AntBreadcrumb.Item key={prop.route}>
              {!prop.route.includes("host") ? (
                formattedName
              ) : (
                <Link to={prop.route}>{formattedName}</Link>
              )}
            </AntBreadcrumb.Item>
          );
        })}
      </AntBreadcrumb>
    </section>
  );
};

export default PageBreadcrumb;
