import { Alert, Container, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";

import { getTodayEvents } from "@api/events.jsx";
import CurrentEvents from "@components/CurrentEvents/CurrentEvents.jsx";
import LoadingSpinner from "@components/Spinner/LoadingSpinner";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert.jsx";

function Home() {
  const {
    data: currentEvents,
    isLoading,
    isError,
    error,
  } = useQuery(["events", "today"], getTodayEvents);

  // RENDER
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorAlert error={error} />;

  return (
    <Container>
      <CurrentEvents events={currentEvents} />
    </Container>
  );
}

export default Home;
