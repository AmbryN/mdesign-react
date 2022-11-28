import { ChangeEventHandler, Dispatch } from "react";

import {
  DateInput,
  NumberInput,
  Select,
  TextInput,
  TimeInput,
} from "@components/forms/Inputs";
import { Address, EventType } from "@api/models";

function BaseForm({
  fields,
  item,
  selectItems,
  setItem,
  error,
}: {
  fields: [
    {
      label: string;
      name: string;
      type: string;
    }
  ];
  item: any;
  selectItems?: { type: EventType[]; address: Address[] };
  setItem: Dispatch<any>;
  error: { isError: boolean; message: string };
}) {
  const handleChange: ChangeEventHandler<HTMLInputElement> &
    ChangeEventHandler<HTMLSelectElement> = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    if (name == "address") {
      setItem({
        ...item,
        address: { id: value },
      });
    } else if (name == "type") {
      setItem({
        ...item,
        type: { id: value },
      });
    } else {
      setItem({
        ...item,
        [name]: value,
      });
    }
  };

  const fieldSelection = (
    index: number,
    { label, name, type }: { label: string; name: string; type: string }
  ) => {
    switch (type) {
      case "text":
        return (
          <TextInput
            key={index}
            label={label}
            name={name}
            value={item[name]}
            setValue={handleChange}
          />
        );
      case "select":
        return (
          <Select
            key={index}
            label={label}
            name={name}
            items={selectItems[name]}
            value={item[name]}
            setValue={handleChange}
          />
        );
      case "number":
        return (
          <NumberInput
            key={index}
            label={label}
            name={name}
            value={item[name]}
            setValue={handleChange}
          />
        );
      case "date":
        return (
          <DateInput
            key={index}
            label={label}
            name={name}
            value={item[name]}
            setValue={handleChange}
          />
        );
      case "time":
        return (
          <TimeInput
            key={index}
            label={label}
            name={name}
            value={item[name]}
            setValue={handleChange}
          />
        );
    }
  };

  return (
    <form>
      {error.isError && <div>Erreur : un ou des champs sont vides !</div>}
      {fields.map((field, index) => {
        return fieldSelection(index, field);
      })}
    </form>
  );
}

export default BaseForm;
