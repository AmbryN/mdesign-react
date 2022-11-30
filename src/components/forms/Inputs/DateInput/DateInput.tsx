import { ChangeEventHandler, Dispatch } from "react";

function DateInput({
  label,
  name,
  value,
  setValue,
}: {
  label: string;
  name: string;
  value: string;
  setValue: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col m-2">
      <label htmlFor={name}>{label}</label>
      <input
        className="p-2 rounded"
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
