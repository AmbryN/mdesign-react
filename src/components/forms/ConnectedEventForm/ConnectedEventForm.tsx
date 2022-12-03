import { ChangeEventHandler, Dispatch, MouseEventHandler } from "react";

import { Address, EventType } from "@api/models";
import { useAddresses } from "@api/hooks/useAddresses";
import { useEventTypes } from "@api/hooks/useEventTypes";
import BaseForm from "@components/forms/BaseForm/BaseForm";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";

type ConnectedFormProps = {
  fields: {
    label: string;
    name: string;
    type: string;
    value: any;
    setValue: ChangeEventHandler<HTMLFormElement>;
  }[];
  error: { isError: boolean; message: string };
};

function ConnectedEventForm(props: ConnectedFormProps) {
  const { data: addresses, isLoading: isLoadingAddresses } = useAddresses();

  const { data: eventTypes, isLoading: isLoadingTypes } = useEventTypes();

  let selectItems = new Map<String, any[]>();
  selectItems.set("type", eventTypes || []);
  selectItems.set("address", addresses || []);

  if (isLoadingAddresses || isLoadingTypes) return <LoadingSpinner />;

  return <BaseForm selectItems={selectItems} {...props} />;
}

export default ConnectedEventForm;
