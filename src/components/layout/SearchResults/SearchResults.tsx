import { ChangeEventHandler, useState } from "react";

import { Person } from "@api/models";
import { usePostParticipant } from "@api/hooks/usePersons";
import BaseForm from "@components/forms/BaseForm/BaseForm";
import { useParams } from "react-router-dom";
import Modal from "@components/layout/Modal/Modal";
import styled from "styled-components";

const ResultContainer = styled.div`
  position: absolute;
  left: 1rem;
  top: 4.2rem;
  width: 80%;
  max-height: 25rem;
  overflow: scroll;
`

export default function SearchResults({
  results,
  onSelect,
}: {
  results: Person[];
  onSelect: Function;
}) {
  const { id } = useParams();

  // STATE
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState({ isError: false, message: "" });
  const [item, setItem] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    number: "",
    street: "",
    postalCode: "",
    city: "",
    type: "PERSON",
  });

  // DATA
  const postParticipant = usePostParticipant(id!);

  // EVENT HANDLERS
  const onNew = () => {
    setItem({
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      number: "",
      street: "",
      postalCode: "",
      city: "",
      type: "PERSON",
    });
    setShowForm(true);
  };

  const updateItem: ChangeEventHandler<HTMLFormElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setItem({ ...item, [name]: value });
  };

  const updateItemSelects = (name: string, value: any) => {
    setItem({ ...item, [name]: value });
  };

  const handleSaveForm = () => {
    if (
      item.firstName !== "" &&
      item.lastName !== "" &&
      item.gender !== "" &&
      item.dateOfBirth !== "" &&
      item.email !== "" &&
      item.phone !== "" &&
      item.number !== "" &&
      item.street !== "" &&
      item.postalCode !== "" &&
      item.city !== ""
    ) {
      const newItem = {
        ...item,
        lastname: item.lastName.toUpperCase(),
        email: item.email.toLowerCase(),
        phone: item.phone.replace(" ", "").replace(".", ""),
        address: {
          number: item.number,
          street: item.street,
          postalCode: item.postalCode,
          city: item.city,
          type: item.type,
        },
      };
      postParticipant.mutate(newItem);
      handleCloseForm();
    } else {
      setFormError({
        isError: true,
        message: "Un ou des champs sont incomplets",
      });
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Form settings
  const formFields = [
    {
      label: "Nom",
      name: "lastName",
      type: "text",
      value: item.lastName,
      setValue: updateItem,
    },
    {
      label: "Prénom",
      name: "firstName",
      type: "text",
      value: item.firstName,
      setValue: updateItem,
    },
    {
      label: "Sexe",
      name: "gender",
      type: "select",
      value: item.gender,
      setValue: updateItemSelects,
    },
    {
      label: "Date de naissance",
      name: "dateOfBirth",
      type: "date",
      value: item.dateOfBirth,
      setValue: updateItem,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      value: item.email,
      setValue: updateItem,
    },
    {
      label: "Téléphone",
      name: "phone",
      type: "phone",
      value: item.phone,
      setValue: updateItem,
    },
    {
      label: "Numéro de rue",
      name: "number",
      type: "text",
      value: item.number,
      setValue: updateItem,
    },
    {
      label: "Rue",
      name: "street",
      type: "text",
      value: item.street,
      setValue: updateItem,
    },
    {
      label: "Code Postal",
      name: "postalCode",
      type: "text",
      value: item.postalCode,
      setValue: updateItem,
    },
    {
      label: "Ville",
      name: "city",
      type: "text",
      value: item.city,
      setValue: updateItem,
    },
  ];

  let selectItems = new Map<string, string[]>();
  selectItems.set("gender", ["HOMME", "FEMME"]);

  return (
    <ResultContainer>
      <ul className="border-2 flex flex-col bg-white divide-y divide-dashed divide-gray-300">
        <button onClick={onNew}>
          <li className="p-3 hover:bg-gray-300">-- Créer --</li>
        </button>
        {results
          ? results.map((result, index) => (
              <button key={index} onClick={() => onSelect(result)}>
                <li className="p-3 hover:bg-gray-300">{`${result.lastName} ${result.firstName}`}</li>
              </button>
            ))
          : null}
      </ul>

      {showForm && (
        <Modal
          title="Créer une personne"
          handleClose={handleCloseForm}
          handleSave={handleSaveForm}
        >
          <BaseForm
            fields={formFields}
            selectItems={selectItems}
            error={formError}
          />
        </Modal>
      )}
    </ResultContainer>
  );
}
