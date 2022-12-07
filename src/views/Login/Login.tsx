import BaseForm from "@components/forms/BaseForm/BaseForm";
import { ChangeEventHandler, useEffect, useState } from "react";
import { getCurrentUser, login } from "@api/auth.service";
import { LoginRequest } from "@api/models";
import { useNavigate } from "react-router-dom";
import Card from "@components/layout/Card/Card";
import { BasicButton } from "@components/Buttons/Button";
import BaseContainer from "@components/layout/BaseContainer/BaseContainer";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) navigate("/home");
  }, []);

  const [user, setUser] = useState({} as LoginRequest);

  const [formError, setFormError] = useState({
    isError: false,
    message: "",
  });

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
    }
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
    <BaseContainer>
      <Card handleSave={handleSave}>
        <BaseForm fields={formFiels} error={formError} />
        <BasicButton variant="primary" onClick={handleSave}>
          S'identifier
        </BasicButton>
      </Card>
    </BaseContainer>
  );
}
