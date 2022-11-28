import { ChangeEventHandler } from "react";

function DateInput({
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
        name={name}
        type="date"
        value={value}
        onChange={(e) => setValue(e)}
        required
      />
    </div>
  );
}

export default DateInput;
