import { Button } from "antd";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi"; // Đúng cách nhập biểu tượng
import "../LayoutAdmin/LayoutAdmin.scss";

interface ToggleThemeButtonProps {
  darkTheme: boolean;
  toggleTheme: () => void;
}

const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = ({
  darkTheme,
  toggleTheme,
}) => {
  return (
    <div>
      <div className="toggle-theme-btn">
        <Button onClick={toggleTheme}>
          {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
        </Button>
      </div>
    </div>
  );
};

export default ToggleThemeButton;
