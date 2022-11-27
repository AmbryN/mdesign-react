import { Dispatch, useState } from "react";

import { Address, EventType } from "@api/models";
import { useAddresses } from "@api/hooks/useAddresses";
import { useEventTypes } from "@api/hooks/useEventTypes";
import BaseForm from "@components/forms/BaseForm/BaseForm";

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
  const [selectItems, setSelectItems] = useState(new Map<string, any[]>());

  const { data: addresses }: { data?: Address[] } = useAddresses({
    onSuccess: () => {
      setSelectItems(selectItems.set("address", addresses!));
    },
  });

  const { data: eventTypes }: { data?: EventType[] } = useEventTypes({
    onSuccess: () => {
      setSelectItems(selectItems.set("type", eventTypes!));
    },
  });

  return <BaseForm selectItems={selectItems} {...props} />;
}

export default ConnectedEventForm;
