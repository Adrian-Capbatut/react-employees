import { Layout, Space, Typography } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "../custom-button";
import styles from "./index.module.css";
import { Paths } from "../../paths";
import { logout, selectUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

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
      {user ? (
        <CustomButton
          type="ghost"
          icon={<LogoutOutlined />}
          onClick={onLogoutClick}>
          Iesire
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton type="ghost" icon={<UserOutlined />}>
              Inregistrare
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton type="ghost" icon={<LoginOutlined />}>
              Logare
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
