import { useParams } from "react-router-dom";

import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import EventDescription from "@components/EventDescription/EventDescription";
import PersonsListContainer from "@components/PersonsListContainer/PersonsListContainer";
import { useEvent } from "@api/hooks/useEvents";
import { Person } from "@api/models";
import {
  useDeleteHost,
  useDeleteParticipant,
  useHosts,
  useParticipants,
  usePostHost,
  usePostParticipant,
} from "@api/hooks/usePersons";

function Event() {
  const { id } = useParams();
  const { data: event, isLoading, isError, error } = useEvent(id!);

  const { data: participants, isLoading: isLoadingParticipants } =
    useParticipants(id!);
  const { data: hosts, isLoading: isLoadingHosts } = useHosts(id!);

  const postParticipant = usePostParticipant(id!);
  const deleteParticipant = useDeleteParticipant(id!);
  const postHost = usePostHost(id!);
  const deleteHost = useDeleteHost(id!);

  const addParticipant = (participant: Person) => {
    postParticipant.mutate(participant);
  };

  const removeParticipant = (personId: number) => {
    deleteParticipant.mutate(personId);
  };

  const addHost = (host: Person) => {
    postHost.mutate(host);
  };

  const removeHost = (personId: number) => {
    deleteHost.mutate(personId);
  };

  if (isLoading || isLoadingParticipants || isLoadingHosts)
    return <LoadingSpinner />;

  if (isError) return <ErrorAlert errorMessage={error.message} />;

  return (
    <div className="flex flex-col items-center">
      <EventDescription event={event!} />
      <PersonsListContainer
        name="Participants"
        persons={participants!}
        addPerson={addParticipant}
        deletePerson={removeParticipant}
      />
      <PersonsListContainer
        name="Animateurs"
        persons={hosts!}
        addPerson={addHost}
        deletePerson={removeHost}
      />
    </div>
  );
}

export default Event;
