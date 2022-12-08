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
            <span className="flex flex-col md:flex md:flex-row">
              <p className="ml-2">{`${person.lastName} ${person.firstName}`}</p>
              <p className="ml-2">{`${person.email}`}</p>
              <p className="ml-2">{`${person.phone}`}</p>
            </span>
            <button onClick={() => deletePerson(person.id!)}>
              <i className="material-icons">delete</i>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
