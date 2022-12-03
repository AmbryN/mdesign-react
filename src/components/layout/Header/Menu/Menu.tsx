import { BasicButton } from "@components/Buttons/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  color: #fff;
  list-style-type: none;
`;
function Menu() {
  const links = [
    { name: "Accueil", path: "/" },
    { name: "Événements", path: "/events" },
    { name: "Types d'événements", path: "/types" },
    { name: "Adresses", path: "/addresses" },
  ];

  return (
    <Nav>
      {links.map((link, index) => {
        return (
          <Link key={index} to={link.path}>
            <li>
              <BasicButton variant="primary">{link.name}</BasicButton>
            </li>
          </Link>
        );
      })}
    </Nav>
  );
}

export default Menu;
