import { MouseEventHandler, ReactNode } from "react";

import styled from "styled-components";

const color = (props) => {
  if (props.variant === "primary")
    return {
      bg: "#1e3a8a",
      text: "white",
    };
  if (props.variant === "warning")
    return {
      bg: "#fad902",
      text: "black",
    };
  if (props.variant === "danger")
    return {
      bg: "#ef2929",
      text: "white",
    };
  else
    return {
      bg: "#1e3a8a",
      text: "white",
    };
};

const Button = styled.button`
  margin: 0.2rem;
  padding: 0.4rem;
  border-radius: 0.25rem;
  background-color: ${(props) => color(props).bg};
  color: ${(props) => color(props).text};
`;

export function BasicButton({
  onClick,
  children,
  className,
  type,
  ...restProps
}: {
  variant?: string;
  type?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Button {...restProps} onClick={onClick}>
      {children}
    </Button>
  );
}
