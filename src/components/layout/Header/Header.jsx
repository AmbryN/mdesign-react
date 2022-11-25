import styled from "styled-components";
import { Navbar, Container } from "react-bootstrap";

import logo from "@assets/img/logo.png";
import Menu from "./Menu/Menu.jsx";

const Logo = styled.img`
  height: 5vh;
`;

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Logo src={logo} alt="Logo M-Design" />
        </Navbar.Brand>
        <Menu />
      </Container>
    </Navbar>
  );
}

export default Header;
