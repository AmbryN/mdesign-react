import { ChangeEventHandler } from "react";

function Select({
  label,
  name,
  items,
  value,
  setValue,
}: {
  label: string;
  name: string;
  items: any[];
  value: { id: string };
  setValue: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={"mx-2"}>
        {label}
      </label>
      <select
        className="p-2 rounded m-2"
        name={name}
        value={value.id}
        onChange={(e) => setValue(e)}
        required
      >
        <option></option>
        {items.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name || item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
