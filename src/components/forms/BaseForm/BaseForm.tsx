import { ChangeEventHandler } from "react";

import { Select, Input } from "@components/forms/Inputs";
import Alert from "@components/Alert/Alert";

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
      default:
        return (
          <Input
            key={index}
            type={type}
            label={label}
            name={name}
            value={value}
            setValue={setValue}
          />
        );
    }
  };

  return (
    <form>
      {error.isError && <Alert errorMessage={error.message} />}
      {fields.map((field, index) => {
        return fieldSelection(index, field);
      })}
    </form>
  );
}

export default BaseForm;
