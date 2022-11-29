import { ChangeEventHandler } from "react";

function TextInput({
  label,
  name,
  value,
  setValue,
  onFocus,
}: {
  label: string;
  name: string;
  value: string;
  setValue: ChangeEventHandler<any>;
  onFocus?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col m-2">
      <label htmlFor={name} className="mx-2">
        {label} :
      </label>
      <input
        autoComplete="off"
        className="p-2 rounded"
        name={name}
        type="text"
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e)}
        onFocus={onFocus}
        required
      />
    </div>
  );
}

export default TextInput;
