import { Form } from "react-bootstrap";
import { ChangeEvent, ChangeEventHandler, Dispatch } from "react";

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
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type="date"
        value={value}
        onChange={(e) => setValue(e)}
        required
      />
    </Form.Group>
  );
}

export default DateInput;
