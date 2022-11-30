import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  useState,
} from "react";

import { DateInput } from "@components/forms/Inputs";
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
    <div className="flex flex-col w-5/6 p-3 my-3 bg-gray-200 rounded">
      <div className="flex justify-between">
        <h1 className="h1">{title}</h1>
      </div>
      <form className="flex flex-wrap justify-between" onSubmit={handleSubmit}>
        <DateInput
          label="Date début"
          name="startDate"
          value={item.startDate}
          setValue={updateQuery}
        />
        <DateInput
          label="Date fin"
          name="endDate"
          value={item.endDate}
          setValue={updateQuery}
        />
        <BasicButton type="submit" primary className="self-end">
          Rechercher
        </BasicButton>
      </form>
    </div>
  );
}
