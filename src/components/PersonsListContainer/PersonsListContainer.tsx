import { Person } from "@api/models";
import { useEffect, useState } from "react";
import SearchBar from "@components/layout/SearchBar/SearchBar";
import PersonsList from "@components/PersonsListContainer/PersonsList/PersonsList";
import { getPersonByName } from "@api/person.service";
import Modal from "@components/layout/Modal/Modal";

export default function PersonsListContainer({
  name,
  persons,
  addPerson,
  deletePerson,
  onCreate,
  isAdmin,
}: {
  name: string;
  persons: Person[];
  addPerson: Function;
  deletePerson: Function;
  onCreate: Function;
  isAdmin: boolean;
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [elementToDelete, setElementToDelete] = useState("");

  const searchBarQueryParams = {
    queryKey: ["persons"],
    queryFn: getPersonByName,
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const stageForDeletion = (id: string) => {
    setElementToDelete(id);
    setShowConfirmDelete(true);
  };

  const confirmDeletion = (id: string) => {
    deletePerson(id);
    setShowConfirmDelete(false);
  };

  const handleClose = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div className="w-5/6 mt-3 p-4 font-sans rounded bg-gray-200">
      <div
        className="flex items
      -center mb-3"
      >
        <h2 className="mr-2">{name}</h2>
        {!showSearch ? (
          <button onClick={toggleSearch} className="material-icons">
            add
          </button>
        ) : (
          <button onClick={toggleSearch} className="material-icons">
            remove
          </button>
        )}
      </div>
      <div>
        {showSearch && (
          <SearchBar
            label="Nom"
            name="name"
            select={addPerson}
            queryParameters={searchBarQueryParams}
            onCreate={onCreate}
          />
        )}
      </div>
      <PersonsList
        persons={persons}
        deletePerson={stageForDeletion}
        isAdmin={isAdmin}
      />
      {showConfirmDelete && (
        <Modal
          title={"Supprimer ?"}
          handleSave={() => confirmDeletion(elementToDelete)}
          handleClose={handleClose}
        >
          <p>Êtes vous sûr de bien vouloir supprimer l'élément ?</p>
        </Modal>
      )}
    </div>
  );
}
