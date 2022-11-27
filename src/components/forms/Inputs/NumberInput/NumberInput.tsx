import { Form } from "react-bootstrap";
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
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="number"
        min="0"
        name={name}
        value={value}
        onChange={(e) => setValue(e)}
        required
      />
    </Form.Group>
  );
}

export default NumberInput;
