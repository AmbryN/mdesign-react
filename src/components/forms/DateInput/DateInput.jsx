import { Form } from "react-bootstrap";

function DateInput({ label, name, value, setValue }) {
    return (
        <Form.Group className="mb-3" controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control name={name} type="date"
                value={value}
                onChange={e => setValue(e.target.value)}
                required />
        </Form.Group>
    )
}

export default DateInput