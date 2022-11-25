import { useState } from "react";

import { Alert, Button, Container } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  deleteAddress,
  getAddresses,
  getAddressesWithTypeEvent,
  postAddress,
  putAddress,
} from "@api/addresses.jsx";
import AddressForm from "../../components/forms/AddressForm/AddressForm.jsx";
import FormModal from "../../components/layout/FormModal/FormModal";
import AddressTable from "../../components/AddressTable/AddressTable.jsx";
import LoadingSpinner from "@components/Spinner/LoadingSpinner";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert.jsx";

function Addresses() {
  const queryClient = useQueryClient();

  // CRUD GET
  const {
    data: addresses,
    isLoading,
    isError,
    error: addressError,
  } = useQuery(["addresses", { type: "EVENT" }], getAddressesWithTypeEvent);

  // CRUD POST
  const postQuery = useMutation(postAddress, {
    onSuccess: () => {
      getAddresses;
      queryClient.invalidateQueries(["addresses", { type: "EVENT" }]);
    },
  });

  // CRUD PUT
  const putQuery = useMutation(putAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses", { type: "EVENT" }]);
    },
  });

  // CRUD DELETE
  const deleteQuery = useMutation(deleteAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses", { type: "EVENT" }]);
    },
    onError: () => {
      setError({
        error:
          "Impossible de supprimer l'adresse => peut-être est-elle liée à un événement ou une personne ?",
      });
    },
  });

  // EVENT HANDLERS
  const handleUpdate = (id) => {
    setAddress(addresses.find((address) => address.id === parseInt(id)));
    setShowModal(true);
  };

  const handleDelete = (id) => {
    deleteQuery.mutate(id);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormError(null);
  };

  const handleNewAddress = () => {
    setAddress({
      id: null,
      name: "",
      number: "",
      street: "",
      postalCode: "",
      city: "",
      type: "EVENT",
    });
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
      setFormError(null);
    } else {
      setFormError({
        error: "Un ou des champs sont incomplets",
      });
    }
  };

  // COMPONENT STATE
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState({});
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);

  // RENDER
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorAlert error={addressError} />;

  return (
    <Container>
      {error && <ErrorAlert error={error} />}
      <Button className="my-3" variant="primary" onClick={handleNewAddress}>
        Créer une nouvelle adresse
      </Button>

      <AddressTable
        addresses={addresses}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />

      {showModal && (
        <FormModal
          title="Ajouter une adresse"
          show={showModal}
          handleClose={handleClose}
          handleSave={handleSave}
        >
          <AddressForm
            address={address}
            setAddress={setAddress}
            error={formError}
          />
        </FormModal>
      )}
    </Container>
  );
}

export default Addresses;
