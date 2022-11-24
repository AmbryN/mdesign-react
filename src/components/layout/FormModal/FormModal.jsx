import {Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";
import * as React from "react";

function FormModal({title, show, handleClose, handleSave, children}) {

    return (
        <Modal show={show}>
            <ModalHeader closeButton onClick={handleClose}>
                <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={handleClose}>Annuler</Button>
                <Button variant="primary" onClick={handleSave}>Enregistrer</Button>
            </ModalFooter>
        </Modal>
    )
}

export default FormModal