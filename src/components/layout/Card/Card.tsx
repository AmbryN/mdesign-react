import {ReactNode} from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  max-height: 70vh;
  margin: 5vh auto;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  background-color: #fff;
`;

export default function Card({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CardContainer>
      {children}
    </CardContainer>
  );
}
