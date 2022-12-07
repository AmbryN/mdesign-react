import styled from "styled-components";
import { ReactNode } from "react";

const Container = styled.div`
  position: relative;
  padding: 6rem 0 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function BaseContainer({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}
