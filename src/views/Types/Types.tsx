import { ChangeEventHandler, useState } from "react";

import {
  useDeleteEventType,
  useEventTypes,
  usePostEventType,
} from "@api/hooks/useEventTypes";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import Alert from "@components/Alert/Alert";
import DataTable from "@components/DataTable/DataTable";
import BaseForm from "@components/forms/BaseForm/BaseForm";
import Modal from "@components/layout/Modal/Modal";
import { BasicButton } from "@components/Buttons/Button";
import BaseContainer from "@components/layout/BaseContainer/BaseContainer";

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
  const stageForDeletion = (id: string) => {
    setElementToDelete(id);
  };

  const handleDelete = (id: string) => {
    deleteQuery.mutate(id);
  };

  const handleClose = () => {
    setShowForm(false);
    setShowConfirmDelete(false);
    setFormError({
      isError: false,
      message: "",
    });
  };

  const handleNewType = () => {
    setType({ name: "" });
    setShowForm(true);
  };

  const updateType: ChangeEventHandler<HTMLFormElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setType({ ...type, [name]: value });
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
  const [type, setType] = useState({ name: "" });
  const [error, setError] = useState({ isError: false, message: "" });
  const [formError, setFormError] = useState({ isError: false, message: "" });

  const tableColumns = [
    { header: "#", name: "id" },
    { header: "Nom", name: "name" },
  ];

  const formFields = [
    {
      label: "Nom du type",
      name: "name",
      type: "text",
      value: type.name,
      setValue: updateType,
    },
  ];

  // RENDER
  if (isLoading)
    return (
      <BaseContainer>
        <LoadingSpinner />
      </BaseContainer>
    );

  if (isError)
    return (
      <BaseContainer>
        <Alert errorMessage={eventTypesError.message} />
      </BaseContainer>
    );

  return (
    <BaseContainer>
      <BasicButton variant="primary" onClick={handleNewType}>
        Créer un type
      </BasicButton>
      {error.isError && <Alert errorMessage={error.message}></Alert>}
      {showForm && (
        <Modal
          title={"Ajouter un type"}
          handleSave={handleSave}
          handleClose={handleClose}
        >
          <BaseForm fields={formFields} error={formError} />
        </Modal>
      )}

      <DataTable
        columns={tableColumns}
        rows={eventTypes!}
        handleDelete={handleDelete}
      />
    </BaseContainer>
  );
}

export default Types;
