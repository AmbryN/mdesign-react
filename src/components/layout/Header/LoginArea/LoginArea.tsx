import { ChangeEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "@components/layout/Modal/Modal";
import BaseForm from "@components/forms/BaseForm/BaseForm";
import { getCurrentUser, login, logout } from "@api/auth.service";
import { LoginRequest, LoginResponse } from "@api/models";
import { useNavigate } from "react-router-dom";

const Login = styled.span`
  margin-right: 1rem;
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    margin: 0.2rem 0;
  } ;
`;

const Username = styled.span`
  color: white;
  margin-right: 2rem;
`;

const LoginButton = styled.span`
  margin: 0.2rem;
  padding: 0.4rem;
  border-radius: 0.25rem;
  background-color: #1e3a8a;
  color: #fff;
  display: block;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    margin: 0;
  } ;
`;

export default function LoginArea() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(null);
  useEffect(() => {
    const user = getCurrentUser();
    if (user) setUsername(user.username);
  }, []);

  useEffect(() => {}, [username]);

  const [isLoggedIn, setIsLoggedIn] = useState(!!getCurrentUser());

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [user, setUser] = useState({} as LoginRequest);
  const [formError, setFormError] = useState({
    isError: false,
    message: "",
  });

  const handleClose = () => {
    setIsLoginOpen(false);
    setFormError({ isError: false, message: "" });
  };

  const handleChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    if (user.username !== "" && user.password !== "") {
      login(user).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            error.toString();
          setFormError({ isError: true, message: errorMessage });
        }
      );
      if (getCurrentUser()) {
        setIsLoggedIn(true);
      }
      handleClose();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
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
    return (
      <Login>
        {isLoggedIn && <Username>{username}</Username>}
        <LoginButton onClick={handleLogout}>Déconnexion</LoginButton>;
      </Login>
    );

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
