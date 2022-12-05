import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteHost,
  deleteParticipant,
  getHosts,
  getParticipants,
  getPersons,
  postHost,
  postParticipant,
} from "@api/person.service";
import { Person } from "@api/models";

const usePersons = (options?: any) =>
  useQuery(["persons"], getPersons, options);

const useParticipants = (eventId: string, options?: any) => {
  return useQuery(
    ["participants", eventId],
    () => getParticipants(eventId),
    options
  );
};

const usePostParticipant = (eventId: string, options?: any) => {
  const queryClient = useQueryClient();
  return useMutation(
    (participant: Person) => postParticipant(eventId, participant),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["participants", eventId]);
      },
      ...options,
    }
  );
};

const useDeleteParticipant = (eventId: string, options?: any) => {
  const queryClient = useQueryClient();
  return useMutation(
    (participantId: number) => deleteParticipant(eventId, participantId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["participants", eventId]);
      },
      ...options,
    }
  );
};

const useHosts = (eventId: string, options?: any) => {
  return useQuery(["hosts", eventId], () => getHosts(eventId), options);
};

const usePostHost = (eventId: string, options?: any) => {
  const queryClient = useQueryClient();
  return useMutation((host: Person) => postHost(eventId, host), {
    onSuccess: () => {
      queryClient.invalidateQueries(["hosts", eventId]);
    },
    ...options,
  });
};

const useDeleteHost = (eventId: string, options?: any) => {
  const queryClient = useQueryClient();
  return useMutation((hostId: number) => deleteHost(eventId, hostId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["hosts", eventId]);
    },
    ...options,
  });
};

export {
  usePersons,
  useParticipants,
  usePostParticipant,
  useDeleteParticipant,
  useHosts,
  usePostHost,
  useDeleteHost,
};
