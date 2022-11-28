import { useState } from "react";

import { EventType } from "@api/models";
import {
  useDeleteEventType,
  useEventTypes,
  usePostEventType,
} from "@api/hooks/useEventTypes";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import DataTable from "@components/DataTable/DataTable";
import BaseForm from "@components/forms/BaseForm/BaseForm";
import Button from "@components/Button/Button";

function Types() {
  // CRUD GET
  const {
    data: eventTypes,
    isLoading,
    isError,
    error: eventTypesError,
  } = useEventTypes();

  // CRUD POST
  const postQuery = usePostEventType({
    onError: () => {
      setError({
        isError: true,
        message: "Impossible d'ajouter le type",
      });
    },
  });

  // CRUD DELETE
  const deleteQuery = useDeleteEventType({
    onError: () => {
      setError({
        isError: true,
        message:
          "Impossible de supprimer le type => peut-être est-elle liée à un événement ?",
      });
    },
  });

  // EVENT HANDLERS
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

  const handleNewType = () => {
    setType({
      name: "",
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (type.name !== "") {
      postQuery.mutate(type);
      handleClose();
      setFormError({ isError: false, message: "" });
    } else {
      setFormError({
        isError: true,
        message: "Le champ est incomplet",
      });
    }
  };

  // COMPONENT STATE
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState({} as EventType);
  const [error, setError] = useState({ isError: false, message: "" });
  const [formError, setFormError] = useState({ isError: false, message: "" });

  const tableColumns = [
    { header: "#", name: "id" },
    { header: "Nom", name: "name" },
  ];

  const formFields = [{ label: "Nom du type", name: "name", type: "text" }];

  // RENDER
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorAlert errorMessage={eventTypesError.message} />;

  return (
    <div className="flex flex-col items-center">
      {error.isError && <ErrorAlert errorMessage={error.message} />}
      <Button variant="primary" onClick={handleNewType}>
        Créer un type
      </Button>

      {showForm && (
        <BaseForm
          title="Ajouter un type"
          handleClose={handleClose}
          handleSave={handleSave}
          fields={formFields}
          item={type}
          setItem={setType}
          error={formError}
        />
      )}

      <DataTable
        columns={tableColumns}
        rows={eventTypes!}
        hasUpdate={false}
        hasDelete={true}
        handleDelete={handleDelete}
        handleUpdate={() => {}}
      />
    </div>
  );
}

export default Types;
