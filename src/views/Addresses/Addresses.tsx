import { useState } from "react";

import { Address } from "@api/models";
import {
  useAddresses,
  useDeleteAddress,
  usePostAddress,
  usePutAddress,
} from "@api/hooks/useAddresses";

import FormModal from "@components/layout/FormModal/FormModal";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import DataTable from "@components/DataTable/DataTable";
import BaseForm from "@components/forms/BaseForm/BaseForm";
import PrimaryButton from "@components/Button/PrimaryButton";

function Addresses() {
  // CRUD GET
  const {
    data: addresses,
    isLoading: isLoadingAddresses,
    isError: isErrorAddresses,
    error: addressesError,
  } = useAddresses();

  // CRUD POST
  const postQuery = usePostAddress({
    onError: () => {
      setError({
        isError: true,
        message: `Impossible d'ajouter l'adresse`,
      });
    },
  });

  // CRUD PUT
  const putQuery = usePutAddress({
    onError: () => {
      setError({
        isError: true,
        message: `Impossible de modifier l'adresse`,
      });
    },
  });

  // CRUD DELETE
  const deleteQuery = useDeleteAddress({
    onError: () => {
      setError({
        isError: true,
        message: `Impossible de supprimer l'adresse => peut-être est-elle liée à un événement ou une personne ?`,
      });
    },
  });

  // EVENT HANDLERS
  const handleUpdate = (id: string) => {
    setAddress(
      addresses!.find((address) => address.id === parseInt(id)) ??
        ({} as Address)
    );
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    deleteQuery.mutate(id);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormError({ isError: false, message: "" });
  };

  const handleNewAddress = () => {
    setAddress({
      name: "",
      number: "",
      street: "",
      postalCode: "",
      city: "",
      type: "EVENT",
    } as Address);
    setShowModal(true);
  };

  const handleSave = () => {
    if (
      address.name !== "" &&
      address.number !== "" &&
      address.street !== "" &&
      address.postalCode !== "" &&
      address.city !== ""
    ) {
      if (address.id == null) {
        postQuery.mutate(address);
      } else {
        putQuery.mutate(address);
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
  const [address, setAddress] = useState({} as Address);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [formError, setFormError] = useState({
    isError: false,
    message: "",
  });

  const tableColumns = [
    { header: "#", name: "id" },
    { header: "Nom", name: "name" },
    { header: "Numéro", name: "number" },
    { header: "Rue", name: "street" },
    { header: "Code Postal", name: "postalCode" },
    { header: "Ville", name: "city" },
  ];

  const formFields = [
    { label: "Nom de l'adresse", name: "name", type: "text" },
    { label: "Numéro de rue", name: "number", type: "text" },
    { label: "Rue", name: "street", type: "text" },
    { label: "Code Postal", name: "postalCode", type: "text" },
    { label: "Ville", name: "city", type: "text" },
  ];

  // RENDER
  if (isLoadingAddresses) return <LoadingSpinner />;

  if (isErrorAddresses)
    return <ErrorAlert errorMessage={addressesError.message} />;

  return (
    <div className="flex flex-col items-center">
      {error.isError && <ErrorAlert errorMessage={error.message} />}
      <PrimaryButton
        variant="primary"
        textColor="white"
        onClick={handleNewAddress}
      >
        Créer une nouvelle adresse
      </PrimaryButton>

      <DataTable
        columns={tableColumns}
        rows={addresses!}
        hasUpdate={true}
        handleUpdate={handleUpdate}
        hasDelete={true}
        handleDelete={handleDelete}
      />

      {showModal && (
        <FormModal
          title="Ajouter une adresse"
          show={showModal}
          handleClose={handleClose}
          handleSave={handleSave}
        >
          <BaseForm
            fields={formFields}
            item={address}
            setItem={setAddress}
            error={formError}
          />
        </FormModal>
      )}
    </div>
  );
}

export default Addresses;
