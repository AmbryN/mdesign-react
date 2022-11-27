import { ChangeEventHandler, Dispatch } from "react";

import { Alert, Form } from "react-bootstrap";

import {
  DateInput,
  NumberInput,
  Select,
  TextInput,
  TimeInput,
} from "@components/forms/Inputs";

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
  selectItems: Map<string, any[]>;
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
            items={selectItems.get(name) || []}
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
    <Form>
      {error.isError && (
        <Alert variant="danger">Erreur : un ou des champs sont vides !</Alert>
      )}
      {fields.map((field, index) => {
        return fieldSelection(index, field);
      })}
    </Form>
  );
}

export default BaseForm;
