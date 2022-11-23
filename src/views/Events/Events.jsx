import EventTable from "../../components/EventTable/EventTable.jsx";
import { useEffect, useState} from "react";
import {Alert, Container, Spinner} from "react-bootstrap";
import * as React from "react";
import FormModal from "../../components/layout/FormModal/FormModal";
import Button from "react-bootstrap/Button";
import EventForm from "../../components/forms/EventForm/EventForm";

function Events() {
    const [events, setEvents] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect (() => {
        setLoading(true);
        (async() => {
            try {
                const response = await fetch('http://localhost:8080/events')
                const fetchedEvents = await response.json()
                setEvents(fetchedEvents.sort((a, b) => a.id - b.id))
                setLoading(false);
            } catch (e) {
                setError(true)
                setLoading(false);
            }
        })();
    }, [])

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <Container>
            <Button variant="primary" onClick={handleShow}>Créer un nouvel événement</Button>
            {showModal
                &&
                <FormModal show={showModal} handleClose={handleClose}>
                    <EventForm/>
                </FormModal>
            }
            {loading && <Spinner animation="border" role="status"/> }
            {error && <Alert variant="danger">Une erreur est survenue !</Alert>}
            {(!error && !loading) && <EventTable events={events}/>}
        </Container>
    )
}

export default Events