import React from "react";
import { PageHeader as AntPageHeader, Space, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

type PageHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  tags?: React.ReactElement;
  showGoBackArrow?: boolean;
  help?: React.ReactNode;
  helpStyle?: React.CSSProperties;
  footer?: React.ReactNode;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle = "",
  tags,
  showGoBackArrow = false,
  help = "",
  footer,
}) => {
  return (
    <>
      <AntPageHeader
        //className={styles.PageHeader}
        ghost={false}
        title={
          <Space align="center">
            {title}
            {help && (
              <Tooltip placement="right" title={help}>
                <QuestionCircleOutlined className={styles.help} />
              </Tooltip>
            )}
          </Space>
        }
        subTitle={
          <span style={{ display: "flex", alignItems: "flex-end" }}>
            {subtitle}
          </span>
        }
        tags={tags}
        footer={footer}
      />
    </>
  );
};

export default PageHeader;
