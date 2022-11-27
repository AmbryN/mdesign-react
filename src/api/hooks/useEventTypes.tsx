import { useMutation, useQuery, useQueryClient } from "react-query";

import { deleteEventType, getEventTypes, postEventType } from "@api/types";

const useEventTypes = (options?: any) =>
  useQuery(["eventTypes"], getEventTypes, options);

const usePostEventType = (options?: any) => {
  const queryClient = useQueryClient();
  return useMutation(postEventType, {
    onSuccess: () => {
      queryClient.invalidateQueries(["eventTypes"]);
    },
    ...options,
  });
};

const useDeleteEventType = (options?: any) => {
  const queryClient = useQueryClient();
  return useMutation(deleteEventType, {
    onSuccess: () => {
      queryClient.invalidateQueries(["eventTypes"]);
    },
    ...options,
  });
};

export { useEventTypes, usePostEventType, useDeleteEventType };
