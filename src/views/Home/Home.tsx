import FilterForm from "@components/forms/FilterForm/FilterForm";
import { FormEventHandler, useState } from "react";
import { useQuery } from "react-query";
import { getMDesginResults } from "@api/queries";
import DataTable from "@components/DataTable/DataTable";

function Home() {
  const [query, setQuery] = useState({
    startDate: "",
    endDate: "",
  });
  const { data: mDesignResults, isFetched } = useQuery(
    ["mdesign", query.startDate, query.endDate],
    () => getMDesginResults(query.startDate, query.endDate),
    {
      enabled: query.startDate !== "" && query.endDate !== "",
    }
  );

  const tableColumns = [
    { header: "Lieu", name: "address" },
    { header: "Événements", name: "events" },
    { header: "Dates", name: "dates" },
    { header: "Nombre d'événements", name: "nbEvents" },
    { header: "Nombre de participants", name: "nbParticipants" },
    { header: "Nombre de d'homme", name: "nbMen" },
    { header: "Nombre de femme", name: "nbWomen" },
    { header: "Age le plus faible", name: "lowestAge" },
    { header: "Age le plus élevé", name: "highestAge" },
    { header: "Heures prévues", name: "soldHours" },
    { header: "Heures réalisées", name: "executedHours" },
  ];

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center">
      <FilterForm
        title={"Trier les données"}
        item={query}
        setItem={setQuery}
        onSubmit={handleSubmit}
      />
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

export default Home;
