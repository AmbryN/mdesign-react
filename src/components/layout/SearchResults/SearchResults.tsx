import { useState } from "react";

import { Person } from "@api/models";
import { usePostParticipant } from "@api/hooks/usePersons";
import BaseForm from "@components/forms/BaseForm/BaseForm";
import { useParams } from "react-router-dom";

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
    type: "",
  });

  // DATA
  const postParticipant = usePostParticipant(id!);

  // Form settings
  const formFields = [
    { label: "Nom", name: "lastName", type: "text" },
    { label: "Prénom", name: "firstName", type: "text" },
    { label: "Sexe", name: "gender", type: "select" },
    { label: "Date de naissance", name: "dateOfBirth", type: "date" },
    { label: "Email", name: "email", type: "text" },
    { label: "Téléphone", name: "phone", type: "text" },
    { label: "Numéro de rue", name: "number", type: "text" },
    { label: "Rue", name: "street", type: "text" },
    { label: "Code Postal", name: "postalCode", type: "text" },
    { label: "Ville", name: "city", type: "text" },
  ];

  let selectItems = new Map<string, string[]>();
  selectItems.set("gender", ["HOMME", "FEMME"]);

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
      type: "",
    });
    setShowForm(true);
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
      item.city !== "" &&
      item.type !== ""
    ) {
      const newItem = {
        ...item,
        address: {
          number: item.number,
          street: item.street,
          postalCode: item.postalCode,
          city: item.city,
          type: "PERSON",
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

  return (
    <div>
      <ul className="w-2/6 border-2 relative left-3 -top-3 flex flex-col bg-white divide-y divide-dashed divide-gray-300">
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
        <BaseForm
          title="Créer une personne"
          fields={formFields}
          selectItems={selectItems}
          item={item}
          setItem={setItem}
          error={formError}
          handleClose={handleCloseForm}
          handleSave={handleSaveForm}
        />
      )}
    </div>
  );
}
