import { useState } from "react";

import { Alert, Container, Button } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { deleteEvent, getEvents, postEvent, putEvent } from "@api/events.jsx";
import LoadingSpinner from "@components/Spinner/LoadingSpinner";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert.jsx";
import EventTable from "../../components/EventTable/EventTable.jsx";
import EventForm from "../../components/forms/EventForm/EventForm";
import FormModal from "../../components/layout/FormModal/FormModal";

function Events() {
  const queryClient = useQueryClient();
  // CRUD GET
  const {
    data: events,
    isLoading,
    isError,
    error: eventsError,
  } = useQuery("events", getEvents);

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
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorAlert error={eventsError} />;

  return (
    <Container>
      {error && <ErrorAlert error={error} />}
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
