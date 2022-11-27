import { Form } from "react-bootstrap";
import { ChangeEvent, ChangeEventHandler, Dispatch } from "react";

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
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="time"
        name={name}
        pattern="[0-9]{2}:[0-9]{2}"
        value={value}
        onChange={(e) => setValue(e)}
      />
    </Form.Group>
  );
}

export default TimeInput;
