import { ChangeEventHandler } from "react";
import styled from "styled-components";

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

const InputLabel = styled.label`
  margin: 0 0 0.3rem 0.1rem;
  font-weight: bold;
`;

const InputText = styled.input`
  border: 0.1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 0.5rem;

  &:hover {
    border: 0.1px solid rgba(0, 0, 0, 0.3);
  }
`;

function Input({
  type,
  label,
  name,
  value,
  setValue,
  onFocus,
  onBlur,
}: {
  type: string;
  label: string;
  name: string;
  value: string;
  setValue: ChangeEventHandler<HTMLInputElement>;
  onFocus?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
}) {
  const isTime = () => type === "time";
  const isNumber = () => type === "number";

  return (
    <InputGroup>
      <InputLabel htmlFor={name}>{label} :</InputLabel>
      <InputText
        autoComplete="off"
        name={name}
        type={type}
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e)}
        onFocus={onFocus}
        onBlur={onBlur}
        required
        pattern={isTime() ? "[0-9]{2}:[0-9]{2}" : ""} // Used only for time
        min={isNumber() ? "0" : ""} // Used only for number
      />
    </InputGroup>
  );
}

export default Input;
