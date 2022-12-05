import { ChangeEvent, ChangeEventHandler, Dispatch } from "react";
import styled from "styled-components";

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

const SelectLabel = styled.label`
  margin: 0 0 0.3rem 0.1rem;
  font-weight: bold;
`;

const SelectInput = styled.select`
  border: 0.1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 0.5rem;
  background-color: #fff;

  &:hover {
    border: 0.1px solid rgba(0, 0, 0, 0.3);
  }
`;

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
  value: any;
  setValue: Function;
}) {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.value) {
      if (items[0].id) {
        const item = items.find((item) => item.id == e.target.value);
        setValue(name, item);
      } else setValue(name, value);
    }
  };

  return (
    <InputGroup>
      <SelectLabel htmlFor={name}>{label}</SelectLabel>
      <SelectInput
        name={name}
        value={value.id || value}
        onChange={onChange}
        required
      >
        <option></option>
        {items.map((item, index) => (
          <option key={index} value={item.id || item}>
            {item.name || item}
          </option>
        ))}
      </SelectInput>
    </InputGroup>
  );
}

export default Select;
