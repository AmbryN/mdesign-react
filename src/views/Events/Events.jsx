import EventTable from "../../components/EventTable/EventTable.jsx";
import { useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import FormModal from "../../components/layout/FormModal/FormModal";
import Button from "react-bootstrap/Button";
import EventForm from "../../components/forms/EventForm/EventForm";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteEvent,
  getEvents,
  postEvent,
  putEvent,
} from "../../api/events.jsx";

function Events() {
  const queryClient = useQueryClient();
  // CRUD GET
  const { data: events, isLoading, isError } = useQuery("events", getEvents);

  // CRUD POST
  const postQuery = useMutation(postEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
  });

  // CRUD PUT
  const putQuery = useMutation(putEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
  });

  // CRUD DELETE
  const deleteQuery = useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
    onError: () => {
      setError({
        error: "Impossible de supprimer l'événement",
      });
    },
  });

  // EVENT HANDLERS
  const handleUpdate = (id) => {
    setEvent(events.find((event) => event.id === parseInt(id)));
    setShowModal(true);
  };

  const handleDelete = (id) => {
    deleteQuery.mutate(id);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormError(null);
  };

  const handleNewEvent = () => {
    setEvent({
      id: null,
      name: "",
      type: "",
      address: {},
      date: "",
      soldHours: "",
      startTime: "",
      endTime: "",
      url: "",
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (
      event.name !== "" &&
      event.type !== "" &&
      event.address !== "" &&
      event.date !== "" &&
      event.soldHours !== ""
    ) {
      if (event.id == null) {
        postQuery.mutate(event);
      } else {
        putQuery.mutate(event);
      }
      handleClose();
      setFormError(null);
    } else {
      setFormError({
        error: "Un ou des champs sont incomplets",
      });
    }
  };

  // COMPONENT STATE
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState({});
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);

  // RENDER
  if (isLoading)
    return (
      <Container>
        <Spinner animation="border" role="status" />
      </Container>
    );

  if (isError)
    return (
      <Container>
        <Alert variant="danger">
          Une erreur est survenue : {error.message}
        </Alert>
      </Container>
    );

  return (
    <Container>
      {error && <Alert variant="danger">Erreur : {error.error}</Alert>}
      <Button className="my-3" variant="primary" onClick={handleNewEvent}>
        Créer un nouvel événement
      </Button>
      <EventTable
        events={events}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />

      {showModal && (
        <FormModal
          title="Ajouter un événement"
          show={showModal}
          handleClose={handleClose}
          handleSave={handleSave}
        >
          <EventForm event={event} setEvent={setEvent} error={formError} />
        </FormModal>
      )}
    </Container>
  );
}

export default Events;
