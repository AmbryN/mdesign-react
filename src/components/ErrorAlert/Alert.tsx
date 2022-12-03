import styled from "styled-components";

const AlertContainer = styled.div`
  margin: 1rem auto;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid rgba(199, 15, 15, 0.5);
  border-radius: 3px;
  padding: 0.5rem;
  background-color: rgba(199, 15, 15, 0.3);
`;

const Icon = styled.i`
  position: relative;
  top: 3px;
  color: rgba(199, 15, 15, 0.8);
  margin-right: 0.5rem;
`;

function Alert({ errorMessage }: { errorMessage: string }) {
  return (
    <AlertContainer>
      <span>
        <Icon className="material-icons">error</Icon>
      </span>
      Une erreur est survenue : {errorMessage}
    </AlertContainer>
  );
}

export default Alert;
