import { ChangeEvent, ChangeEventHandler, Dispatch } from "react";

function TextInput({
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
    <div className="flex flex-col">
      <label className="mx-2">{label} :</label>
      <input
        autoComplete="off"
        className="p-2 rounded"
        name={name}
        type="text"
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e)}
        required
      />
    </div>
  );
}

export default TextInput;
