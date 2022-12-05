import { BasicButton } from "@components/Buttons/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {getCurrentUser} from "@api/auth.service";

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
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
      const user = getCurrentUser();
      if (user) {
          setCurrentUser(user);
          setIsUser(user.roles.includes("ROLE_USER"));
          setIsAdmin(user.roles.includes("ROLE_ADMIN"));
      }
  }, [])

  const links = [
    { name: "Accueil", path: "/home", role: ["user"]},
    { name: "Récapitulatif", path: "/query", role: ["admin"] },
    { name: "Événements", path: "/events", role: ["admin"] },
    { name: "Types d'événements", path: "/types", role: ["admin"] },
    { name: "Adresses", path: "/addresses", role: ["admin"] },
  ];

  return (
    <Nav>
      {isUser && links.filter(link => link.role.includes("user")).map((link, index) => {
        return (
          <Link key={`${index}-${link.path}`} to={link.path}>
            <Li>{link.name}</Li>
          </Link>
        );
      })}
      {isAdmin && links.filter(link => link.role.includes("admin")).map((link, index) => {
        return (
            <Link key={`${index}-${link.path}`} to={link.path}>
              <Li>{link.name}</Li>
            </Link>
        );
      })}
    </Nav>
  );
}

export default Menu;
