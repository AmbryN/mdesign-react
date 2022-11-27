import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteAddress,
  getAddressesWithTypeEvent,
  postAddress,
  putAddress,
} from "@api/addresses";

const useAddresses = (options?: any) => {
  return useQuery(
    ["addresses", { type: "EVENT" }],
    getAddressesWithTypeEvent,
    options
  );
};

const usePostAddress = (options?: any) => {
  const queryClient = useQueryClient();
  return useMutation(postAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses", { type: "EVENT" }]);
    },
    ...options,
  });
};

const usePutAddress = (options?: any) => {
  const queryClient = useQueryClient();
  return useMutation(putAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses", { type: "EVENT" }]);
    },
    ...options,
  });
};

const useDeleteAddress = (options?: any) => {
  const queryClient = useQueryClient();
  return useMutation(deleteAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses", { type: "EVENT" }]);
    },
    ...options,
  });
};

export { useAddresses, usePostAddress, usePutAddress, useDeleteAddress };
