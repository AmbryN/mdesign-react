import logo from "@assets/img/logo.png";
import styled from "styled-components";
import Login from "./LoginArea/LoginArea";
import Menu from "./Menu/Menu";
import BaseForm from "@components/forms/BaseForm/BaseForm";
import Modal from "@components/layout/Modal/Modal";
import { useState } from "react";

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f2937;
`;

const Navigation = styled.div`
  display: flex;
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
