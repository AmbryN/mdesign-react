import { Dispatch, MouseEventHandler } from "react";

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
  selectItems,
  error,
  handleClose,
  handleSave,
}: {
  title: string;
  fields: {
    label: string;
    name: string;
    type: string;
    value: any;
    setValue: Dispatch<any>;
  }[];
  selectItems?: Map<String, any[]>;
  error: { isError: boolean; message: string };
  handleClose: MouseEventHandler<HTMLButtonElement>;
  handleSave: MouseEventHandler<HTMLButtonElement>;
}) {
  const fieldSelection = (
    index: number,
    {
      label,
      name,
      type,
      value,
      setValue,
    }: {
      label: string;
      name: string;
      type: string;
      value: any;
      setValue: Dispatch<any>;
    }
  ) => {
    switch (type) {
      case "text":
        return (
          <TextInput
            key={index}
            label={label}
            name={name}
            value={value}
            setValue={setValue}
          />
        );
      case "select":
        return (
          <Select
            key={index}
            label={label}
            name={name}
            items={selectItems!.get(name) || []}
            value={value}
            setValue={setValue}
          />
        );
      case "number":
        return (
          <NumberInput
            key={index}
            label={label}
            name={name}
            value={value}
            setValue={setValue}
          />
        );
      case "date":
        return (
          <DateInput
            key={index}
            label={label}
            name={name}
            value={value}
            setValue={setValue}
          />
        );
      case "time":
        return (
          <TimeInput
            key={index}
            label={label}
            name={name}
            value={value}
            setValue={setValue}
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
      <form className="flex flex-wrap justify-between">
        {error.isError && <div>{error.message}</div>}
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
