import { Form } from "react-bootstrap";

function Select({ label, name, items, value, setValue }) {
    return (
        <Form.Group className="mb-3" controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Select aria-label="{name} select"
                         name={name}
                         value={value}
                         onChange={(e) => setValue(e.target.value)}
                         required>
                <option></option>
                {items.map((item, index) => <option key={index}
                    value={item}>{item}</option>)}
            </Form.Select>
        </Form.Group>
    )
}

export default Select