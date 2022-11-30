import { MouseEventHandler, ReactNode } from "react";

import styled from "styled-components";

const color = (props: any) => {
  if (props.primary)
    return {
      bg: "#1e3a8a",
      text: "white",
    };
  if (props.warning)
    return {
      bg: "#fad902",
      text: "black",
    };
  if (props.danger)
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
  width: 100px;
  border-radius: 0.25rem;
  background-color: ${(props) => color(props).bg};
  color: ${(props) => color(props).text};
`;

const LongButton = styled(Button)`
  width: 250px;
`;

export function BasicButton({
  onClick,
  children,
  className,
  type,
  ...restProps
}: {
  primary?: boolean;
  warning?: boolean;
  danger?: boolean;
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

export function LargeButton({
  onClick,
  children,
  className,
  ...restProps
}: {
  primary?: boolean;
  warning?: boolean;
  danger?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <LongButton {...restProps} onClick={onClick}>
      {children}
    </LongButton>
  );
}
