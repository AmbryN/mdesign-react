import { useParams } from "react-router-dom";

import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import EventDescription from "@components/EventDescription/EventDescription";
import PersonList from "@components/PersonList/PersonList";
import { useEvent } from "@api/hooks/useEvents";
import { useState } from "react";
import { Person } from "@api/models";
import { useParticipants } from "@api/hooks/usePersons";

function Event() {
  const { id } = useParams();
  const { data: event, isLoading, isError, error } = useEvent(id!);

  const { data: participants, isLoading: isLoadingParticipants } =
    useParticipants(id!);
  const hosts = [] as Person[];

  const [showModal, setShowModal] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorAlert errorMessage={error.message} />;

  return (
    <div className="flex flex-col items-center">
      <EventDescription event={event!} />
      <PersonList name="Participants" eventId={id!} persons={participants} />
      <PersonList name="Animateurs" eventId={id!} persons={hosts} />
    </div>
  );
}

export default Event;
