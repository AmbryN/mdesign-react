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
    <div className="mb-3">
      <label>{label}</label>
      <input
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
