import styled from "styled-components";

const Container = styled.div`
  position: relative;
  top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function BaseContainer({ children }) {
  return <Container>{children}</Container>;
}
