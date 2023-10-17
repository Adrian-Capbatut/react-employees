import { Layout, Space, Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CustomButton } from "../custom-button";
import styles from "./index.module.css";
import { Paths } from "../../paths";

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="ghost">
            <Typography.Title level={1}> Utilizatori</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.register}>
          <CustomButton type="ghost">Inregistrare</CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton type="ghost">Logare</CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};
