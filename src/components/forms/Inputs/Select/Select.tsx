import { ChangeEvent, ChangeEventHandler, Dispatch } from "react";

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
  value: any;
  setValue: Function;
}) {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.value) {
      if (items[0].id) {
        const item = items.find((item) => item.id == e.target.value);
        setValue(name, item);
      } else setValue(name, value);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={"mx-2"}>
        {label}
      </label>
      <select
        className="p-2 rounded m-2"
        name={name}
        value={value.id || value}
        onChange={onChange}
        required
      >
        <option></option>
        {items.map((item, index) => (
          <option key={index} value={item.id || item}>
            {item.name || item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
