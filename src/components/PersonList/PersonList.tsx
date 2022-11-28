import { Person } from "@api/models";
import { useState } from "react";
import SearchBar from "@components/layout/SearchBar/SearchBar";
import {
  useDeleteParticipant,
  usePostParticipant,
} from "@api/hooks/usePersons";

export default function PersonList({
  name,
  persons,
  eventId,
}: {
  name: string;
  persons: Person[];
  eventId: string;
}) {
  const [showSearch, setShowSearch] = useState(false);

  const postParticipant = usePostParticipant(eventId);
  const deleteParticipant = useDeleteParticipant(eventId);

  const addParticipant = (participant: Person) => {
    postParticipant.mutate(participant);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const removeParticipant = (personId: number) => {
    deleteParticipant.mutate(personId);
  };

  return (
    <div className="w-5/6 mt-3 p-4 font-sans rounded bg-gray-200">
      <div
        className="flex items
      -center mb-3"
      >
        <h2 className="mr-2">{name}</h2>
        <button onClick={toggleSearch} className="material-icons">
          add
        </button>
      </div>
      <div>
        {showSearch && (
          <SearchBar label="Nom" name="name" select={addParticipant} />
        )}
        <ul className="divide-y divide-gray-400">
          {persons.map((person, index) => {
            return (
              <li key={index} className="flex justify-between">
                <span>{`${person.lastName} ${person.firstName}`}</span>
                <button onClick={() => removeParticipant(person.id!)}>
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
