import { Menu } from "antd";
import "../LayoutAdmin/LayoutAdmin.scss";
import HomeOutlined from "@ant-design/icons/HomeOutlined";
import AppstoreOutlined from "@ant-design/icons/AppstoreOutlined";
import PlayCircleOutlined from "@ant-design/icons/PlayCircleOutlined";
import SettingOutlined from "@ant-design/icons/SettingOutlined";
import BarsOutlined from "@ant-design/icons/BarsOutlined";
import { Link } from "react-router-dom";

interface MenuListProps {
  darkTheme: boolean;
}

const MenuList: React.FC<MenuListProps> = ({ darkTheme }) => {
  return (
    <div>
      <Menu
        theme={darkTheme ? "dark" : "light"}
        mode="inline"
        className="menu-bar"
      >
        <Menu.Item key="admin" icon={<HomeOutlined />}>
          <Link to="/admin">Home</Link>
        </Menu.Item>
        <Menu.Item key="admin/product" icon={<AppstoreOutlined />}>
        <Link to="/admin/product">Dashboard</Link>
        </Menu.Item>
        <Menu.SubMenu key="subtasks" icon={<BarsOutlined />} title="Tasks">
          <Menu.Item key="task-1">Task 1</Menu.Item>
          <Menu.Item key="task-2">Task 2</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="progress" icon={<PlayCircleOutlined />}>
          Progress
        </Menu.Item>
        <Menu.Item key="setting" icon={<SettingOutlined />}>
          Setting
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuList;
