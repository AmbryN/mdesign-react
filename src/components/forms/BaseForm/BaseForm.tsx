import { ChangeEventHandler } from "react";

import {
  DateInput,
  NumberInput,
  Select,
  TextInput,
  TimeInput,
} from "@components/forms/Inputs";

function BaseForm({
  fields,
  selectItems,
  error,
}: {
  fields: {
    label: string;
    name: string;
    type: string;
    value: any;
    setValue: ChangeEventHandler<HTMLFormElement>;
  }[];
  selectItems?: Map<String, any[]>;
  error: { isError: boolean; message: string };
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
      setValue: ChangeEventHandler<HTMLElement>;
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
      case "password":
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
    <form className="flex flex-wrap justify-between">
      {error.isError && <div>{error.message}</div>}
      {fields.map((field, index) => {
        return fieldSelection(index, field);
      })}
    </form>
  );
}

export default BaseForm;
