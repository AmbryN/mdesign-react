import { ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import Modal from "@components/layout/Modal/Modal";
import BaseForm from "@components/forms/BaseForm/BaseForm";
import { getCurrentUser, login, logout } from "@api/auth.service";
import { LoginRequest, LoginResponse } from "@api/models";

const Login = styled.span`
  margin-right: 1rem;

  @media (max-width: 500px) {
    margin: 0.2rem 0;
  } ;
`;

const LoginButton = styled.span`
  margin: 0.2rem;
  padding: 0.4rem;
  border-radius: 0.25rem;
  background-color: #1e3a8a;
  color: #fff;
  display: block;

  @media (max-width: 500px) {
    margin: 0;
  } ;
`;

export default function LoginArea() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCurrentUser());

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [user, setUser] = useState({} as LoginRequest);
  const [formError, setFormError] = useState({
    isError: false,
    message: "",
  });

  const handleClose = () => {
    setIsLoginOpen(false);
  };

  const handleChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    if (user.username !== "" && user.password !== "") {
      await login(user);
      if (getCurrentUser()) {
        setIsLoggedIn(true);
      }
    }
    handleClose();
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  const formFiels = [
    {
      label: "Nom d'utilisateur",
      name: "username",
      type: "text",
      value: user.username,
      setValue: handleChange,
    },
    {
      label: "Mot de passe",
      name: "password",
      type: "password",
      value: user.password,
      setValue: handleChange,
    },
  ];

  if (isLoggedIn)
    return <LoginButton onClick={handleLogout}>Déconnexion</LoginButton>;

  return (
    <Login>
      <LoginButton onClick={() => setIsLoginOpen(true)}>Login</LoginButton>

      {isLoginOpen ? (
        <Modal title="Login" handleClose={handleClose} handleSave={handleSave}>
          <BaseForm fields={formFiels} error={formError} />
        </Modal>
      ) : null}
    </Login>
  );
}
