import { Form } from "react-bootstrap";
import { ChangeEventHandler } from "react";

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
  value: { id: string };
  setValue: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        aria-label={`${name} select`}
        name={name}
        value={value.id}
        onChange={(e) => setValue(e)}
        required
      >
        <option></option>
        {items.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name || item}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default Select;
