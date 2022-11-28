import { ChangeEventHandler } from "react";

function TimeInput({
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
        type="time"
        name={name}
        pattern="[0-9]{2}:[0-9]{2}"
        value={value}
        onChange={(e) => setValue(e)}
      />
    </div>
  );
}

export default TimeInput;
