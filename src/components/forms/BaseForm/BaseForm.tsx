import { ChangeEventHandler, Dispatch, MouseEventHandler } from "react";

import {
  DateInput,
  NumberInput,
  Select,
  TextInput,
  TimeInput,
} from "@components/forms/Inputs";
import { BasicButton } from "@components/Buttons/Button";

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
  fields: {
    label: string;
    name: string;
    type: string;
  }[];
  item: any;
  selectItems?: Map<String, any[]>;
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
            items={selectItems!.get(name) || []}
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
        <BasicButton warning onClick={handleClose}>
          Fermer
        </BasicButton>
      </div>
      {error.isError && <div>error.message</div>}
      <form className="flex flex-wrap justify-between">
        {error.isError && <div>Erreur : un ou des champs sont vides !</div>}
        {fields.map((field, index) => {
          return fieldSelection(index, field);
        })}
      </form>
      <BasicButton primary className="self-end" onClick={handleSave}>
        Enregistrer
      </BasicButton>
    </div>
  );
}

export default BaseForm;
