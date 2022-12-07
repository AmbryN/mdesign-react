import { ChangeEventHandler, useEffect, useState } from "react";

import { Address } from "@api/models";
import {
  useAddresses,
  useDeleteAddress,
  usePostAddress,
  usePutAddress,
} from "@api/hooks/useAddresses";

import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import Alert from "@components/Alert/Alert";
import DataTable from "@components/DataTable/DataTable";
import BaseForm from "@components/forms/BaseForm/BaseForm";
import Modal from "@components/layout/Modal/Modal";
import { BasicButton } from "@components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@api/auth.service";
import BaseContainer from "@components/layout/BaseContainer/BaseContainer";

function Addresses() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !user.roles.includes("ROLE_ADMIN")) navigate("/");
  }, []);

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
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteQuery.mutate(id);
  };

  const handleClose = () => {
    setShowForm(false);
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
    setShowForm(true);
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

  const updateAddress: ChangeEventHandler<HTMLFormElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddress({ ...address, [name]: value.trimStart() });
  };

  // COMPONENT STATE
  const [showForm, setShowForm] = useState(false);
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
    { header: "Nom de la rue", name: "street" },
    { header: "Code Postal", name: "postalCode" },
    { header: "Ville", name: "city" },
  ];

  const formFields = [
    {
      label: "Nom de l'adresse",
      name: "name",
      type: "text",
      value: address.name,
      setValue: updateAddress,
    },
    {
      label: "Numéro de rue",
      name: "number",
      type: "text",
      value: address.number,
      setValue: updateAddress,
    },
    {
      label: "Nom de la rue",
      name: "street",
      type: "text",
      value: address.street,
      setValue: updateAddress,
    },
    {
      label: "Code Postal",
      name: "postalCode",
      type: "text",
      value: address.postalCode,
      setValue: updateAddress,
    },
    {
      label: "Ville",
      name: "city",
      type: "text",
      value: address.city,
      setValue: updateAddress,
    },
  ];

  // RENDER
  if (isLoadingAddresses)
    return (
      <BaseContainer>
        <LoadingSpinner />
      </BaseContainer>
    );

  if (isErrorAddresses)
    return (
      <BaseContainer>
        <Alert errorMessage={addressesError.message} />
      </BaseContainer>
    );

  return (
    <BaseContainer>
      {error.isError && <Alert errorMessage={error.message} />}
      <BasicButton variant="primary" onClick={handleNewAddress}>
        Créer une adresse
      </BasicButton>

      {showForm && (
        <Modal
          title={"Ajouter une adresse"}
          handleSave={handleSave}
          handleClose={handleClose}
        >
          <BaseForm fields={formFields} error={formError} />
        </Modal>
      )}

      <DataTable
        columns={tableColumns}
        rows={addresses!}
        hasUpdate={true}
        handleUpdate={handleUpdate}
        hasDelete={true}
        handleDelete={handleDelete}
      />
    </BaseContainer>
  );
}

export default Addresses;
