import logo from "@assets/img/logo.png";
import Menu from "./Menu/Menu";

export default function Header() {
  return (
    <div className="bg-gray-800 flex justify-content-start items-center">
      <img className="h-14 m-2" src={logo} alt="Logo M-Design" />
      <Menu />
    </div>
  );
}
