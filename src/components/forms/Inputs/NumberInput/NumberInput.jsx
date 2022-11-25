import { Form } from "react-bootstrap";

function NumberInput({ label, name, value, setValue }) {
    return (
        <Form.Group className="mb-3" controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type="number" min="0"
                          name={name}
                          value={value}
                          onChange={e => setValue(e)}
                          required />
        </Form.Group>
    )
}

export default NumberInput