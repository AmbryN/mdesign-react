import { Form } from "react-bootstrap";

function TimeInput({ label, name, value, setValue }) {
    return (
        <Form.Group className="mb-3" controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type="time"
                          name={name}
                          pattern="[0-9]{2}:[0-9]{2}"
                          value={value}
                          onChange={e => setValue(e.target.value)}
            />
        </Form.Group>
    )
}

export default TimeInput