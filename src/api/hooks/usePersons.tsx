import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteEventPerson,
  deleteHost,
  deleteParticipant,
  getEventPersons,
  getHosts,
  getParticipants,
  getPersons,
  postEventPerson,
  postHost,
  postParticipant,
} from "@api/person.service";
import { Person } from "@api/models";

const usePersons = (options?: any) =>
  useQuery(["persons"], getPersons, options);

const useEventPersons = (eventId: string, type: string, options?: any) => {
  return useQuery(
    ["event", eventId],
    (t) => getEventPersons(eventId, type),
    options
  );
};

const usePostEventPerson = (eventId: string, type: string, options?: any) => {
  const queryClient = useQueryClient();
  return useMutation(
    (person: Person) => postEventPerson(eventId, type, person),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["event", eventId]);
      },
      ...options,
    }
  );
};

const useDeleteEventPerson = (eventId: string, type: string, options?: any) => {
  const queryClient = useQueryClient();
  return useMutation(
    (personId: number) => deleteEventPerson(eventId, type, personId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["event", eventId]);
      },
      ...options,
    }
  );
};

export {
  usePersons,
  useEventPersons,
  usePostEventPerson,
  useDeleteEventPerson,
};
