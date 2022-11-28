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
    <div className="mb-3">
      <label>{label}</label>
      <input
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
