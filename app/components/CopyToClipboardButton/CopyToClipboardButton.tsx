import React from "react";
import { Button, Tooltip, notification } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

const CopyToClipboardButton = ({ stringToCopy }: { stringToCopy: string }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(stringToCopy);
    notification.success({
      message: `Copied to clipboard:  ${stringToCopy}`,
    });
  };

  return (
    <>
      <Tooltip title="Copy to clipboard">
        <Button
          size="small"
          type="text"
          shape="circle"
          icon={<CopyOutlined />}
          className="Clipboard" //{styles.Clipboard}
          onClick={handleCopyToClipboard}
        />
      </Tooltip>
    </>
  );
};

export default CopyToClipboardButton;
