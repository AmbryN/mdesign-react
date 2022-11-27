import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteEvent, getEvents, postEvent, putEvent } from "@api/events";

const useEvents = (options?: any) => {
  return useQuery("events", getEvents, options);
};

const useEvent = (id: string, options?: any) => {
  return useQuery(["event", id], options);
};

const usePostEvent = (options?: any) => {
  const queryClient = useQueryClient();
  return useMutation(postEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
    ...options,
  });
};

const usePutEvent = (options?: any) => {
  const queryClient = useQueryClient();
  return useMutation(putEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
    ...options,
  });
};

const useDeleteEvent = (options?: any) => {
  const queryClient = useQueryClient();
  return useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
    ...options,
  });
};

export { useEvents, useEvent, usePutEvent, usePostEvent, useDeleteEvent };
