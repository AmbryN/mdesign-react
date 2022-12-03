import { BasicButton } from "@components/Buttons/Button";
import { ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import Modal from "@components/layout/Modal/Modal";
import BaseForm from "@components/forms/BaseForm/BaseForm";

const Login = styled.span`
  margin-right: 1rem;
`;

export default function LoginArea() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [user, setUser] = useState({ username: "", password: "" });
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

  const handleSave = () => {
    handleClose();
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

  return (
    <Login>
      {isLoggedIn ? (
        <BasicButton>Déconnexion</BasicButton>
      ) : (
        <BasicButton onClick={() => setIsLoginOpen(true)}>Login</BasicButton>
      )}
      {isLoginOpen ? (
        <Modal title="Login" handleClose={handleClose} handleSave={handleSave}>
          <BaseForm fields={formFiels} error={formError} />
        </Modal>
      ) : null}
    </Login>
  );
}
