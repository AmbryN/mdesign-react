import { Dispatch, MouseEventHandler } from "react";

import { Address, EventType } from "@api/models";
import { useAddresses } from "@api/hooks/useAddresses";
import { useEventTypes } from "@api/hooks/useEventTypes";
import BaseForm from "@components/forms/BaseForm/BaseForm";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";

type ConnectedFormProps = {
  title: string;
  fields: {
    label: string;
    name: string;
    type: string;
  }[];
  item: any;
  setItem: Dispatch<any>;
  error: { isError: boolean; message: string };
  handleClose: MouseEventHandler<HTMLButtonElement>;
  handleSave: MouseEventHandler<HTMLButtonElement>;
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
