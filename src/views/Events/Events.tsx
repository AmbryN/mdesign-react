import { useState } from "react";

import { Address, Event, EventType } from "@api/models";
import {
  useDeleteEvent,
  useEvents,
  usePostEvent,
  usePutEvent,
} from "@api/hooks/useEvents";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import FormModal from "@components/layout/FormModal/FormModal";
import DataTable from "@components/DataTable/DataTable";
import ConnectedEventForm from "@components/forms/ConnectedEventForm/ConnectedEventForm";
import Button from "@components/Button/Button";

function Events() {
  // CRUD GET
  const { data: events, isLoading, isError, error: eventsError } = useEvents();

  // CRUD POST
  const postQuery = usePostEvent({
    onError: () => {
      setError({
        isError: true,
        message: "Impossible d'ajouter l'événement",
      });
    },
  });

  // CRUD PUT
  const putQuery = usePutEvent({
    onError: () => {
      setError({
        isError: true,
        message: "Impossible de modifier l'événement",
      });
    },
  });

  // CRUD DELETE
  const deleteQuery = useDeleteEvent({
    onError: () => {
      setError({
        isError: true,
        message: "Impossible de supprimer l'événement",
      });
    },
  });

  // EVENT HANDLERS
  const handleUpdate = (id: string) => {
    setEvent(
      events!.find((event) => event.id === parseInt(id)) ?? ({} as Event)
    );
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    deleteQuery.mutate(id);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormError({
      isError: false,
      message: "",
    });
  };

  const handleNewEvent = () => {
    setEvent({
      name: "",
      type: {} as EventType,
      address: {} as Address,
      date: "",
      soldHours: 0,
      startTime: "",
      endTime: "",
      url: "",
      participants: [],
      hosts: [],
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (
      event.name !== "" &&
      event.type.name !== "" &&
      event.address.name !== "" &&
      event.date !== "" &&
      event.soldHours !== 0
    ) {
      if (event.id == null) {
        postQuery.mutate(event);
      } else {
        putQuery.mutate(event);
      }
      handleClose();
      setFormError({
        isError: false,
        message: "",
      });
    } else {
      setFormError({
        isError: true,
        message: "Un ou des champs sont incomplets",
      });
    }
  };

  // COMPONENT STATE
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState({} as Event);
  const [error, setError] = useState({ isError: false, message: "" });
  const [formError, setFormError] = useState({ isError: false, message: "" });

  const tableColumns = [
    { header: "#", name: "id" },
    { header: "Nom", name: "name" },
    { header: "Type", name: "type" },
    { header: "Lieu", name: "address" },
    { header: "Date", name: "date" },
  ];

  const formFields = [
    { label: "Nom de l'événement", name: "name", type: "text" },
    { label: "Type", name: "type", type: "select" },
    { label: "Lieu de l'événement", name: "address", type: "select" },
    { label: "Date de l'événement", name: "date", type: "date" },
    { label: "Nombre d'heures vendues", name: "soldHours", type: "number" },
    { label: "Heure de début", name: "startTime", type: "time" },
    { label: "Heure de fin", name: "endTime", type: "time" },
    { label: "Url", name: "url", type: "text" },
  ];

  // RENDER
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorAlert errorMessage={eventsError.message} />;

  return (
    <div className="flex flex-col items-center">
      {error.isError && <ErrorAlert errorMessage={error.message} />}
      <Button className="mt-3" variant="primary" onClick={handleNewEvent}>
        Créer un nouvel événement
      </Button>

      <DataTable
        columns={tableColumns}
        rows={events!}
        hasShowDetails={true}
        hasUpdate={true}
        handleUpdate={handleUpdate}
        hasDelete={true}
        handleDelete={handleDelete}
      />

      {showModal && (
        <FormModal
          title="Ajouter un événement"
          show={showModal}
          handleClose={handleClose}
          handleSave={handleSave}
        >
          <ConnectedEventForm
            fields={formFields}
            item={event}
            setItem={setEvent}
            error={formError}
          />
        </FormModal>
      )}
    </div>
  );
}

export default Events;
