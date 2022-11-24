import {useState} from "react";
import {Alert, Spinner, Button, Container} from "react-bootstrap";
import EventTypesTable from "../../components/EventTypesTable/EventTypesTable.jsx";
import FormModal from "../../components/layout/FormModal/FormModal";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {deleteEventType, getEventTypes, postEventType, putEventType} from "../../api/eventtypes";
import EventTypeForm from "../../components/forms/EventTypeForm/EventTypeForm.jsx";

function EventTypes() {
    const queryClient = useQueryClient();

    // CRUD GET
    const {data: eventTypes, isLoading, isError, error: eventTypesError} = useQuery('eventTypes', getEventTypes);

    // CRUD POST
    const postQuery = useMutation(postEventType, {
        onSuccess: () => {
            queryClient.invalidateQueries('eventTypes')
        },
    })

    // CRUD DELETE
    const deleteQuery = useMutation(deleteEventType, {
        onSuccess: () => {
            queryClient.invalidateQueries('eventTypes')
        },
        onError: () => {
            setError({
                error: "Impossible de supprimer le type => peut-être est-elle liée à un événement ?"
            })
        }
    })

    // EVENT HANDLERS
    const handleDelete = (id) => {
        deleteQuery.mutate(id)
    }

    const handleClose = () => {
        setShowModal(false);
        setFormError(null);
    }

    const handleNewType = () => {
        setType({
            id: null,
            name: ""
        })
        setShowModal(true);
    }

    const handleSave = () => {
        if (type.name !== "") {
            postQuery.mutate(type)
            handleClose();
            setFormError(null)
        } else {
            setFormError({
                error: "Le champ est incomplet"
            })
        }
    }

    // COMPONENT STATE
    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState({})
    const [error, setError] = useState(null)
    const [formError, setFormError] = useState(null)

    // RENDER
    if (isLoading) return <Container><Spinner animation="border" role="status"/></Container>

    if (isError) return <Container><Alert variant="danger">Une erreur est survenue : {eventTypesError.message}</Alert></Container>

    return (
        <Container>
            {error &&
                <Alert variant="danger">Erreur : {error.error}</Alert>}
            <Button className="my-3" variant="primary" onClick={handleNewType}>Créer un nouveau type d'événement</Button>
            <EventTypesTable eventTypes={eventTypes} handleDelete={handleDelete}/>

            {showModal
                &&
                <FormModal title="Ajouter un type" show={showModal}
                           handleClose={handleClose}
                           handleSave={handleSave}>
                    <EventTypeForm eventType={type} setType={setType} error={formError}/>
                </FormModal>
            }
        </Container>
    )
}

export default EventTypes