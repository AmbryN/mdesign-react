import { Alert, Container, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";

import { getTodayEvents } from "@api/events.jsx";
import CurrentEvents from "@components/CurrentEvents/CurrentEvents.jsx";

function Home() {
  const {
    data: currentEvents,
    isLoading,
    isError,
    error,
  } = useQuery(["events", "today"], getTodayEvents);

  // RENDER
  if (isLoading)
    return (
      <Container>
        <Spinner animation="border" role="status" />
      </Container>
    );

  if (isError)
    return (
      <Container>
        <Alert variant="danger">
          Une erreur est survenue : {error.message}
        </Alert>
      </Container>
    );

  return (
    <Container>
      <CurrentEvents events={currentEvents} />
    </Container>
  );
}

export default Home;
