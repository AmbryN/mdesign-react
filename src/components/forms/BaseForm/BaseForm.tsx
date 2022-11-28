import { ChangeEventHandler, Dispatch, MouseEventHandler } from "react";

import { Address, EventType } from "@api/models";
import Button from "@components/Button/Button";
import {
  DateInput,
  NumberInput,
  Select,
  TextInput,
  TimeInput,
} from "@components/forms/Inputs";

function BaseForm({
  title,
  fields,
  item,
  selectItems,
  setItem,
  error,
  handleClose,
  handleSave,
}: {
  title: string;
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
  handleClose: MouseEventHandler<HTMLButtonElement>;
  handleSave: MouseEventHandler<HTMLButtonElement>;
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
    <div className="flex flex-col w-5/6 p-3 my-3 bg-gray-200 rounded">
      <div className="flex justify-between">
        <h1 className="h1">{title}</h1>
        <Button variant="warning" onClick={handleClose}>
          Fermer
        </Button>
      </div>
      {error.isError && <div>error.message</div>}
      <form className="flex flex-wrap justify-between">
        {error.isError && <div>Erreur : un ou des champs sont vides !</div>}
        {fields.map((field, index) => {
          return fieldSelection(index, field);
        })}
      </form>
      <Button className="self-end" variant="primary" onClick={handleSave}>
        Enregistrer
      </Button>
    </div>
  );
}

export default BaseForm;
