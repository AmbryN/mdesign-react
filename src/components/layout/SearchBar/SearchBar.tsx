import { TextInput } from "@components/forms/Inputs";
import { useDebounce } from "@api/hooks/useDebounce";
import { useState } from "react";
import { useQuery } from "react-query";
import { getPersonByName } from "@api/persons";

function SearchBar({
  label,
  name,
  select,
}: {
  label: string;
  name: string;
  select: Function;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm, 300);

  const {
    data: results,
    isError,
    isFetched,
    error,
  } = useQuery(["persons", debouncedTerm], () =>
    getPersonByName(debouncedTerm)
  );

  return (
    <div className="my-3">
      <TextInput
        label={label}
        name={name}
        value={searchTerm}
        setValue={(e) => setSearchTerm(e.target.value)}
      />
      {isError && <div>{error.message}</div>}
      {isFetched && (
        <ul className="flex flex-col mt-3 bg-white divide-y">
          {results!.map((result, index) => (
            <button key={index} onClick={() => select(result)}>
              <li className="p-3 hover:bg-gray-300">{`${result.lastName} ${result.firstName}`}</li>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
