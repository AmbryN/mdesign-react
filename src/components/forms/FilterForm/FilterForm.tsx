import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  useState,
} from "react";

import { Input } from "@components/forms/Inputs";
import { BasicButton } from "@components/Buttons/Button";

export default function FilterForm({
  title,
  item,
  setItem,
  onSubmit,
}: {
  title: string;
  item: {
    startDate: string;
    endDate: string;
  };
  setItem: Dispatch<any>;
  onSubmit: FormEventHandler;
}) {
  const handleSubmit: FormEventHandler = (e) => {
    if (item.startDate !== "" && item.endDate !== "") {
      onSubmit(e);
    }
  };

  const updateQuery: ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setItem({ ...item, [name]: value });
  };

  return (
    <div className="flex flex-col p-3 my-3 bg-gray-200 rounded">
      <div>
        <h1 className="h1">{title}</h1>
      </div>
      <form className="flex flex-wrap justify-center" onSubmit={handleSubmit}>
        <Input
          type="date"
          label="Date début"
          name="startDate"
          value={item.startDate}
          setValue={updateQuery}
        />
        <Input
          type="date"
          label="Date fin"
          name="endDate"
          value={item.endDate}
          setValue={updateQuery}
        />
        <BasicButton type="submit" variant="primary" className="self-end">
          Rechercher
        </BasicButton>
      </form>
    </div>
  );
}
