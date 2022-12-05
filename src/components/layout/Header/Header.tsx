import logo from "@assets/img/logo.png";
import styled from "styled-components";
import Login from "./LoginArea/LoginArea";
import Menu from "./Menu/Menu";

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f2937;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: stretch;
  } ;
`;

const Navigation = styled.div`
  display: flex;
  @media (max-width: 600px) {
    img {
      display: none;
    }
`;

export default function Header() {
  return (
    <NavBar>
      <Navigation>
        <img className="h-14 m-2" src={logo} alt="Logo M-Design" />
        <Menu />
      </Navigation>
      <Login />
    </NavBar>
  );
}
