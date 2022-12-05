import {ChangeEventHandler, useEffect, useState} from "react";

import { Address, Event, EventType } from "@api/models";
import {
  useDeleteEvent,
  useEvents,
  usePostEvent,
  usePutEvent,
} from "@api/hooks/useEvents";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import Alert from "@components/ErrorAlert/Alert";
import DataTable from "@components/DataTable/DataTable";
import ConnectedEventForm from "@components/forms/ConnectedEventForm/ConnectedEventForm";
import Modal from "@components/layout/Modal/Modal";
import { BasicButton } from "@components/Buttons/Button";
import {getCurrentUser} from "@api/auth.service";
import {useNavigate} from "react-router-dom";

function Events() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !user.roles.includes("ROLE_ADMIN")) navigate("/");
  }, [])

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
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteQuery.mutate(id);
  };

  const handleClose = () => {
    setShowForm(false);
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
    setShowForm(true);
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

  const updateEvent: ChangeEventHandler<HTMLFormElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEvent({ ...event, [name]: value });
  };

  const updateEventSelects = (name: string, value: any) => {
    setEvent({ ...event, [name]: value });
  };

  // COMPONENT STATE
  const [showForm, setShowForm] = useState(false);
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
    {
      label: "Nom de l'événement",
      name: "name",
      type: "text",
      value: event.name,
      setValue: updateEvent,
    },
    {
      label: "Type",
      name: "type",
      type: "select",
      value: event.type,
      setValue: updateEventSelects,
    },
    {
      label: "Lieu de l'événement",
      name: "address",
      type: "select",
      value: event.address,
      setValue: updateEventSelects,
    },
    {
      label: "Date de l'événement",
      name: "date",
      type: "date",
      value: event.date,
      setValue: updateEvent,
    },
    {
      label: "Nombre d'heures vendues",
      name: "soldHours",
      type: "number",
      value: event.soldHours,
      setValue: updateEvent,
    },
    {
      label: "Heure de début",
      name: "startTime",
      type: "time",
      value: event.startTime,
      setValue: updateEvent,
    },
    {
      label: "Heure de fin",
      name: "endTime",
      type: "time",
      value: event.endTime,
      setValue: updateEvent,
    },
    {
      label: "Url",
      name: "url",
      type: "text",
      value: event.url,
      setValue: updateEvent,
    },
  ];

  // RENDER
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Alert errorMessage={eventsError.message} />;

  return (
    <div className="flex flex-col items-center">
      {error.isError && <Alert errorMessage={error.message} />}
      <BasicButton variant="primary" onClick={handleNewEvent}>
        Créer un événement
      </BasicButton>

      {showForm && (
        <Modal
          title={"Ajouter un événement"}
          handleSave={handleSave}
          handleClose={handleClose}
        >
          <ConnectedEventForm
            fields={formFields}
            item={event}
            setItem={setEvent}
            error={formError}
          />
        </Modal>
      )}

      <DataTable
        columns={tableColumns}
        rows={events!}
        hasShowDetails={true}
        hasUpdate={true}
        handleUpdate={handleUpdate}
        hasDelete={true}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Events;
