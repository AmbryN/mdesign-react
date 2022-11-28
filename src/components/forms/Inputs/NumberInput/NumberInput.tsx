import { ChangeEventHandler } from "react";

function NumberInput({
  label,
  name,
  value,
  setValue,
}: {
  label: string;
  name: string;
  value: string;
  setValue: ChangeEventHandler<any>;
}) {
  return (
    <div className="flex flex-col m-2">
      <label htmlFor={name} className="mx-2">
        {label}
      </label>
      <input
        className="p-2 rounded"
        type="number"
        min="0"
        name={name}
        value={value}
        onChange={(e) => setValue(e)}
        required
      />
    </div>
  );
}

export default NumberInput;
