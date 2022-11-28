import { TextInput } from "@components/forms/Inputs";
import { useDebounce } from "@api/hooks/useDebounce";
import { useState } from "react";
import { useQuery } from "react-query";
import { getPersonByName } from "@api/persons";
import SearchResults from "@components/layout/SearchResults/SearchResults";

export default function SearchBar({
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
  const [show, setShow] = useState(false);

  const {
    data: results,
    isError,
    error,
  } = useQuery(
    ["persons", debouncedTerm],
    () => getPersonByName(debouncedTerm),
    {
      onSuccess: () => {
        setShow(true);
      },
    }
  );

  const onSelect = (selectedItem: object) => {
    select(selectedItem);
    setShow(false);
    setSearchTerm("");
  };

  return (
    <div className="my-3">
      <TextInput
        label={label}
        name={name}
        value={searchTerm}
        setValue={(e) => setSearchTerm(e.target.value)}
      />
      {isError && <div>{error.message}</div>}

      {show && results && (
        <SearchResults results={results} onSelect={onSelect} />
      )}
    </div>
  );
}
