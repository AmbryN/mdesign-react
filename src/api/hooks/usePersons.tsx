import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteParticipant,
  getParticipants,
  getPersons,
  postParticipant,
} from "@api/persons";
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

export {
  usePersons,
  useParticipants,
  usePostParticipant,
  useDeleteParticipant,
};
