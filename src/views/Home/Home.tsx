import { Container } from "react-bootstrap";
import { useQuery } from "react-query";

import { getTodayEvents } from "@api/events";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import DataTable from "@components/DataTable/DataTable";

function Home() {
  const {
    data: currentEvents,
    isLoading,
    isError,
    error,
  } = useQuery(["events", "today"], getTodayEvents);

  const columns = [
    { header: "Nom", name: "name" },
    { header: "Type", name: "type" },
    { header: "Lieu", name: "address" },
  ];

  // RENDER
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorAlert errorMessage={error} />;

  return (
    <Container>
      <h1 className="mt-3">Événements du jour</h1>
      <DataTable
        columns={columns}
        rows={currentEvents!}
        hasUpdate={false}
        handleUpdate={() => {}}
        hasDelete={false}
        handleDelete={() => {}}
      />
    </Container>
  );
}

export default Home;
