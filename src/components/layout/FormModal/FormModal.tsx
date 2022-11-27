import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { ReactNode } from "react";

function FormModal({
  title,
  show,
  handleClose,
  handleSave,
  children,
}: {
  title: string;
  show: boolean;
  handleClose: any;
  handleSave: any;
  children: ReactNode;
}) {
  return (
    <Modal show={show}>
      <ModalHeader closeButton onClick={handleClose}>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Enregistrer
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default FormModal;
