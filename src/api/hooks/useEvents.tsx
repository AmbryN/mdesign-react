import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteEvent,
  getEvent,
  getEvents,
  getTodayEvents,
  postEvent,
  putEvent,
} from "@api/events";

const useEvents = (options?: any) => {
  return useQuery("events", getEvents, options);
};

const useTodayEvents = (options?: any) => {
  return useQuery(["events", "today"], getTodayEvents, options);
};

const useEvent = (id: string, options?: any) => {
  return useQuery(["event", id], () => getEvent(id), options);
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

export {
  useEvents,
  useTodayEvents,
  useEvent,
  usePutEvent,
  usePostEvent,
  useDeleteEvent,
};
