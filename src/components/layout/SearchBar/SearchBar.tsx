import { Input } from "@components/forms/Inputs";
import { useDebounce } from "@api/hooks/useDebounce";
import { useState } from "react";
import SearchResults from "@components/layout/SearchResults/SearchResults";
import { useQuery } from "react-query";
import Alert from "@components/Alert/Alert";

export default function SearchBar({
  label,
  name,
  queryParameters,
  select,
  onCreate,
}: {
  label: string;
  name: string;
  queryParameters: { queryKey: string[]; queryFn: Function };
  select: Function;
  onCreate: Function;
}) {
  // STATE
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm, 300);
  const [show, setShow] = useState(false);

  const {
    data: results,
    isError,
    error,
  } = useQuery(
    [queryParameters.queryKey, debouncedTerm],
    () => queryParameters.queryFn(debouncedTerm),
    { enabled: debouncedTerm !== "" }
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
    <div className="relative mt-5 my-3">
      <Input
        type="text"
        label={label}
        name={name}
        value={searchTerm}
        setValue={(e) => setSearchTerm(e.target.value)}
        onFocus={onFocus}
      />

      {isError && <Alert errorMessage={error.message} />}

      {show && results && (
        <SearchResults
          results={results}
          onSelect={onSelect}
          onCreate={onCreate}
        />
      )}
    </div>
  );
}
