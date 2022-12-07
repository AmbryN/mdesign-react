import { BasicButton } from "@components/Buttons/Button";
import { MouseEventHandler, ReactNode } from "react";
import styled, { keyframes } from "styled-components";

const scale = keyframes`
  from {
    transform: scale(90%);
 }

  to {
    transform: scale(100%);
  }
`;

const ModalContainer = styled.div`
  z-index: 4;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 10rem;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  z-index: 5;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  max-height: 70vh;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  background-color: #fff;
  animation: ${scale} 0.1s forwards;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: end;
`;

const ModalBody = styled.div`
  overflow: scroll;
`;

export default function Modal({
  title,
  handleClose,
  handleSave,
  children,
}: {
  title: string;
  handleClose: MouseEventHandler<HTMLButtonElement>;
  handleSave: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) {
  return (
    <ModalContainer>
      <ModalContent>
        <h1 className="h1">{title}</h1>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <BasicButton variant="warning" onClick={handleClose}>
            Annuler
          </BasicButton>
          <BasicButton
            variant="primary"
            className="self-end"
            onClick={handleSave}
          >
            Enregistrer
          </BasicButton>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
}
