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
    <div className="mb-3">
      <label>{label}</label>
      <select
        aria-label={`${name} select`}
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
