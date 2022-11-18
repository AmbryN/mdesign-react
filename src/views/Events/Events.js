import Container from "../../components/layout/Container/Container";
import EventTable from "../../components/EventTable/EventTable";
import {useEffect, useState} from "react";
import {Alert, Spinner} from "react-bootstrap";

function Events() {
    const [events, setEvents] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect (() => {
        setLoading(true);
        (async() => {
            try {
                const response = await fetch('http://localhost:8080/events')
                const json = await response.json()
                setEvents(json.sort((a, b) => a.id - b.id))
                setLoading(false);
            } catch (e) {
                setError(true)
            }
        })();
    }, [])

    return (
        <Container>
            {loading && <Spinner animation="border" role="status"/> }
            {error && <Alert variant="danger">Une erreur est survenue !</Alert>}
            {(!error && !loading) && <EventTable events={events}/>}
        </Container>
    )
}

export default Events