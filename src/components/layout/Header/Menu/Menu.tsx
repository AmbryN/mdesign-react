import { BasicButton } from "@components/Buttons/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  color: #fff;
  list-style-type: none;

  @media (max-width: 500px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  } ;
`;

const Li = styled.li`
  margin: 0.2rem;
  padding: 0.4rem;
  border-radius: 0.25rem;
  background-color: #1e3a8a;
  color: #fff;

  @media (max-width: 500px) {
    margin: 0;
  } ;
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
            <Li>{link.name}</Li>
          </Link>
        );
      })}
    </Nav>
  );
}

export default Menu;
