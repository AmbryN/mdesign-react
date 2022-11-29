import { TextInput } from "@components/forms/Inputs";
import { useDebounce } from "@api/hooks/useDebounce";
import { useState } from "react";
import SearchResults from "@components/layout/SearchResults/SearchResults";
import { useQuery } from "react-query";

export default function SearchBar({
  label,
  name,
  queryParameters,
  select,
}: {
  label: string;
  name: string;
  queryParameters: { queryKey: string[]; queryFn: Function };
  select: Function;
}) {
  // STATE
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm, 300);
  const [show, setShow] = useState(false);

  const {
    data: results,
    isError,
    error,
  } = useQuery([queryParameters.queryKey, debouncedTerm], () =>
    queryParameters.queryFn(debouncedTerm)
  );

  // EVENT HANDLERS
  const onSelect = (selectedItem: object) => {
    select(selectedItem);
    setShow(false);
    setSearchTerm("");
  };

  const onFocus = () => {
    setShow(true);
  };

  return (
    <div className="my-3">
      <TextInput
        label={label}
        name={name}
        value={searchTerm}
        setValue={(e) => setSearchTerm(e.target.value)}
        onFocus={onFocus}
      />

      {isError && <div>{error.message}</div>}

      {show && results && (
        <SearchResults results={results} onSelect={onSelect} />
      )}
    </div>
  );
}
