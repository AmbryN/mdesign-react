import { Person } from "@api/models";
import { useState } from "react";
import SearchBar from "@components/layout/SearchBar/SearchBar";

export default function PersonList({
  name,
  persons,
  addPerson,
  deletePerson,
}: {
  name: string;
  persons: Person[];
  addPerson: Function;
  deletePerson: Function;
}) {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
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
        {showSearch && <SearchBar label="Nom" name="name" select={addPerson} />}
        <ul className="divide-y divide-gray-400">
          {persons.map((person, index) => {
            return (
              <li key={index} className="flex justify-between">
                <span>{`${person.lastName} ${person.firstName}`}</span>
                <button onClick={() => deletePerson(person.id!)}>
                  <i className="material-icons">delete</i>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
