import { Dispatch } from "react";

import { Address, EventType } from "@api/models";
import { useAddresses } from "@api/hooks/useAddresses";
import { useEventTypes } from "@api/hooks/useEventTypes";
import BaseForm from "@components/forms/BaseForm/BaseForm";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";

type ConnectedFormProps = {
  fields: [
    {
      label: string;
      name: string;
      type: string;
    }
  ];
  item: any;
  setItem: Dispatch<any>;
  error: { isError: boolean; message: string };
};

function ConnectedEventForm(props: ConnectedFormProps) {
  const {
    data: addresses,
    isLoading: isLoadingAddresses,
  }: { data?: Address[]; isLoading: boolean } = useAddresses();

  const {
    data: eventTypes,
    isLoading: isLoadingTypes,
  }: {
    data?: EventType[];
    isLoading: boolean;
  } = useEventTypes();

  const selectItems = {
    type: eventTypes!,
    address: addresses!,
  };

  if (isLoadingAddresses || isLoadingTypes) return <LoadingSpinner />;

  return <BaseForm selectItems={selectItems} {...props} />;
}

export default ConnectedEventForm;
