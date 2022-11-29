import { Person } from "@api/models";

export default function PersonsList({
  persons,
  deletePerson,
}: {
  persons: Person[];
  deletePerson: Function;
}) {
  return (
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
  );
}
