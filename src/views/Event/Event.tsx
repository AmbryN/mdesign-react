import { useParams } from "react-router-dom";

import { Container } from "react-bootstrap";

import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import EventDescription from "@components/EventDescription/EventDescription";
import PersonList from "@components/PersonList/PersonList";
import { useEvent } from "@api/hooks/useEvents";

function Event() {
  const { id } = useParams();
  const { data: event, isLoading, isError, error } = useEvent(id!);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorAlert errorMessage={error.message} />;

  return (
    <Container>
      <EventDescription event={event} />
      <PersonList name="Participants" />
      <PersonList name="Animateurs" />
    </Container>
  );
}

export default Event;
