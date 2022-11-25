import { useState } from "react";

import { Alert, Button, Container } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { deleteEventType, getEventTypes, postEventType } from "@api/types.jsx";
import TypesTable from "@components/TypesTable/TypesTable.jsx";
import FormModal from "@components/layout/FormModal/FormModal";
import EventTypeForm from "@components/forms/EventTypeForm/EventTypeForm.jsx";
import LoadingSpinner from "@components/Spinner/LoadingSpinner";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert.jsx";

function Types() {
  const queryClient = useQueryClient();

  // CRUD GET
  const {
    data: eventTypes,
    isLoading,
    isError,
    error: eventTypesError,
  } = useQuery("eventTypes", getEventTypes);

  // CRUD POST
  const postQuery = useMutation(postEventType, {
    onSuccess: () => {
      queryClient.invalidateQueries("eventTypes");
    },
  });

  // CRUD DELETE
  const deleteQuery = useMutation(deleteEventType, {
    onSuccess: () => {
      queryClient.invalidateQueries("eventTypes");
    },
    onError: () => {
      setError({
        error:
          "Impossible de supprimer le type => peut-être est-elle liée à un événement ?",
      });
    },
  });

  // EVENT HANDLERS
  const handleDelete = (id) => {
    deleteQuery.mutate(id);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormError(null);
  };

  const handleNewType = () => {
    setType({
      id: null,
      name: "",
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (type.name !== "") {
      postQuery.mutate(type);
      handleClose();
      setFormError(null);
    } else {
      setFormError({
        error: "Le champ est incomplet",
      });
    }
  };

  // COMPONENT STATE
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState({});
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);

  // RENDER
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorAlert error={eventTypesError} />;

  return (
    <Container>
      {error && <ErrorAlert error={error} />}
      <Button className="my-3" variant="primary" onClick={handleNewType}>
        Créer un nouveau type d'événement
      </Button>
      <TypesTable eventTypes={eventTypes} handleDelete={handleDelete} />

      {showModal && (
        <FormModal
          title="Ajouter un type"
          show={showModal}
          handleClose={handleClose}
          handleSave={handleSave}
        >
          <EventTypeForm eventType={type} setType={setType} error={formError} />
        </FormModal>
      )}
    </Container>
  );
}

export default Types;
