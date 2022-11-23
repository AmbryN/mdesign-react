import {Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";
import * as React from "react";

function FormModal({title, show, error, handleClose, handleSave, children}) {

    return (
        <Modal show={show}>
            <ModalHeader closeButton onClick={handleClose}>
                <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                {error && <Alert variant="danger">Une erreur est survenue : champs incomplets</Alert>}
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