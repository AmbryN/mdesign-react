import FilterForm from "@components/forms/FilterForm/FilterForm";
import {FormEventHandler, useEffect, useState} from "react";
import { useQuery } from "react-query";
import { getMDesginResults } from "@api/query.service";
import DataTable from "@components/DataTable/DataTable";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import Alert from "@components/ErrorAlert/Alert";
import {useNavigate} from "react-router-dom";
import {getCurrentUser} from "@api/auth.service";

function Query() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !user.roles.includes("ROLE_ADMIN")) navigate("/");
  }, [])

  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState({
    startDate: "",
    endDate: "",
  });
  const {
    data: mDesignResults,
    isLoading,
    isError,
    isFetched,
    error,
  } = useQuery(
    ["mdesign", query.startDate, query.endDate],
    () => getMDesginResults(query.startDate, query.endDate),
    {
      enabled: search,
      onSettled: () => setSearch(false),
    }
  );

  const tableColumns = [
    { header: "Lieu", name: "address" },
    { header: "Événements", name: "events" },
    { header: "Dates", name: "dates" },
    { header: "Nombre d'événements", name: "nbEvents" },
    { header: "Nombre de participants", name: "nbParticipants" },
    { header: "Nombre d'hommes", name: "nbMen" },
    { header: "Nombre de femmes", name: "nbWomen" },
    { header: "Age le plus faible", name: "lowestAge" },
    { header: "Age le plus élevé", name: "highestAge" },
    { header: "Heures prévues", name: "soldHours" },
    { header: "Heures réalisées", name: "executedHours" },
  ];

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setSearch(true);
  };

  return (
    <div className="flex flex-col items-center">
      <FilterForm
        title={"Trier les données"}
        item={query}
        setItem={setQuery}
        onSubmit={handleSubmit}
      />

      {isLoading && <LoadingSpinner />}

      {isError && <Alert errorMessage={error.message} />}

      {isFetched && (
        <DataTable
          columns={tableColumns}
          rows={mDesignResults || []}
          hasUpdate={false}
          hasDelete={false}
          handleUpdate={() => {}}
          handleDelete={() => {}}
        />
      )}
    </div>
  );
}

export default Query;
