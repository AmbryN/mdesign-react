import { useNavigate, useParams } from "react-router-dom";

import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import Alert from "@components/ErrorAlert/Alert";
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
import { useEffect, useState } from "react";
import { getCurrentUser } from "@api/auth.service";

function Event() {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !user.roles.includes("ROLE_USER")) navigate("/");
    if (user && user.roles.includes("ROLE_ADMIN")) setIsAdmin(true);
  }, []);

  const { id } = useParams();
  const { data: event, isLoading, isError, error } = useEvent(id!);

  const { data: participants, isLoading: isLoadingParticipants } =
    useParticipants(id!);

  const { data: hosts, isLoading: isLoadingHosts } = useHosts(id!, {
    enabled: isAdmin,
  });

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

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Alert errorMessage={error.message} />;

  return (
    <div className="m-auto flex flex-col items-center">
      <EventDescription event={event!} />
      {!isLoadingParticipants && (
        <PersonsListContainer
          name="Participants"
          persons={participants!}
          addPerson={addParticipant}
          deletePerson={removeParticipant}
        />
      )}
      {!isLoadingHosts && isAdmin && (
        <PersonsListContainer
          name="Animateurs"
          persons={hosts!}
          addPerson={addHost}
          deletePerson={removeHost}
        />
      )}
    </div>
  );
}

export default Event;
