import logo from "@assets/img/logo.png";
import styled, { keyframes } from "styled-components";
import Login from "./LoginArea/LoginArea";
import Menu from "./Menu/Menu";
import { useRef, useState} from "react";

const translate = keyframes`
  from {
    transform: translate(0);
  }

  to {
    transform: translate(50%);
  }
`;

const NavBar = styled.div`
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 72px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #1f2937;
`;

const Navigation = styled.div`
  display: flex;
  @media (max-width: 825px) {
    img {
      display: none;
    }

    @media (max-width: 750px) {
      display: none;
    }
  }
`;

const MenuToggle = styled.button`
  margin-left: 2rem;
  color: #fff;

  @media (min-width: 750px) {
    display: none;
  } ;
`;

const SideMenu = styled.div`
  background-color: rgb(252, 247, 247);
  position: absolute;
  top: 72px;
  left: 0;
  width: 200px;
  height: 1000px;

  @media (min-width: 750px) {
    display: none;
  }
`;

export default function Header() {
  const menu = useRef(null);

  const [menuIsOpen, toggleMenu] = useState(false);
  const onToggle = () => {
    toggleMenu(!menuIsOpen);
  };

  const closeMenu = (e: MouseEvent) => {
      if (menu.current && menuIsOpen && !menu.current.contains(e.target)) toggleMenu(false)
  }
  document.addEventListener("click", closeMenu);

  return (
    <NavBar ref={menu}>
      <MenuToggle className="material-icons" onClick={onToggle}>
        menu
      </MenuToggle>
      <Navigation>
        <img className="h-14 m-2" src={logo} alt="Logo M-Design" />
        <Menu />
      </Navigation>
      <Login />
      {menuIsOpen && (
        <SideMenu  onClick={onToggle}>
          <Menu />
        </SideMenu>
      )}
    </NavBar>
  );
}
