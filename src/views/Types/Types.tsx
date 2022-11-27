import { useState } from "react";

import { Button, Container } from "react-bootstrap";

import { EventType } from "@api/models";
import {
  useDeleteEventType,
  useEventTypes,
  usePostEventType,
} from "@api/hooks/useEventTypes";
import FormModal from "@components/layout/FormModal/FormModal";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import DataTable from "@components/DataTable/DataTable";
import BaseForm from "@components/forms/BaseForm/BaseForm";

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
    setShowModal(false);
    setFormError({
      isError: false,
      message: "",
    });
  };

  const handleNewType = () => {
    setType({
      name: "",
    });
    setShowModal(true);
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
  const [showModal, setShowModal] = useState(false);
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
    <Container>
      {error.isError && <ErrorAlert errorMessage={error.message} />}
      <Button className="my-3" variant="primary" onClick={handleNewType}>
        Créer un nouveau type d'événement
      </Button>
      <DataTable
        columns={tableColumns}
        rows={eventTypes!}
        hasUpdate={false}
        hasDelete={true}
        handleDelete={handleDelete}
        handleUpdate={() => {}}
      />

      {showModal && (
        <FormModal
          title="Ajouter un type"
          show={showModal}
          handleClose={handleClose}
          handleSave={handleSave}
        >
          <BaseForm
            fields={formFields}
            item={type}
            setItem={setType}
            error={formError}
          />
        </FormModal>
      )}
    </Container>
  );
}

export default Types;
