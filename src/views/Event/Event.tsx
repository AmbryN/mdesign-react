import { useNavigate, useParams } from "react-router-dom";

import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";
import Alert from "@components/Alert/Alert";
import EventDescription from "@components/EventDescription/EventDescription";
import PersonsListContainer from "@components/PersonsListContainer/PersonsListContainer";
import { useEvent } from "@api/hooks/useEvents";
import { Person } from "@api/models";
import {
  useDeleteEventPerson,
  usePostEventPerson,
} from "@api/hooks/usePersons";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@api/auth.service";
import BaseContainer from "@components/layout/BaseContainer/BaseContainer";

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

  const postContact = usePostEventPerson(id!, "contacts");
  const deleteContact = useDeleteEventPerson(id!, "contacts");
  const postParticipant = usePostEventPerson(id!, "participants");
  const deleteParticipant = useDeleteEventPerson(id!, "participants");
  const postHost = usePostEventPerson(id!, "hosts");
  const deleteHost = useDeleteEventPerson(id!, "hosts");

  const addContact = (participant: Person) => {
    postContact.mutate(participant);
  };

  const removeContact = (personId: number) => {
    deleteContact.mutate(personId);
  };
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

  if (isLoading)
    return (
      <BaseContainer>
        <LoadingSpinner />
      </BaseContainer>
    );

  if (isError)
    return (
      <BaseContainer>
        <Alert errorMessage={error.message} />
      </BaseContainer>
    );

  return (
    <BaseContainer>
      <EventDescription event={event!} isAdmin={isAdmin} />

      {isAdmin ? (
        <PersonsListContainer
          name="Contacts"
          persons={event?.contacts!}
          addPerson={addContact}
          deletePerson={removeContact}
          onCreate={postContact}
          isAdmin={isAdmin}
        />
      ) : null}

      <PersonsListContainer
        name="Participants"
        persons={event?.participants!}
        addPerson={addParticipant}
        deletePerson={removeParticipant}
        onCreate={postParticipant}
        isAdmin={isAdmin}
      />

      {isAdmin && (
        <PersonsListContainer
          name="Animateurs"
          persons={event?.hosts!}
          addPerson={addHost}
          deletePerson={removeHost}
          onCreate={postHost}
          isAdmin={isAdmin}
        />
      )}
    </BaseContainer>
  );
}

export default Event;
