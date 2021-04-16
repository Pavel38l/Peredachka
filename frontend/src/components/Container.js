import { Card } from "antd";
import React from "react";

const PageContainer = ({ children }) => {
  return <Card style={{ margin: 20 }} bordered={false}>{children}</Card>;
};
export default PageContainer;
