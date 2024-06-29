import { Layout, Button, theme } from "antd";
import "./LayoutAdmin.scss";
import Logo from "../Logo/Logo";
import MenuList from "../Menu/Menu";
import { useState } from "react";
import ToggleThemeButton from "../ToggleThemeButton/ToggleThemeButton";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import { Outlet } from "react-router-dom";

const { Header, Sider } = Layout;

const LayoutAdmin = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Sider
          theme={darkTheme ? "dark" : "light"}
          className="sidebar"
          collapsed={collapsed}
          collapsible
          trigger={null}
        >
          <Logo />
          <MenuList darkTheme={darkTheme} />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              className="toggle"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            ></Button>
          </Header>
          <Outlet />
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutAdmin;
