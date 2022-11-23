import { Form } from "react-bootstrap";

function TextInput({ label, name, value, setValue }) {
    return (
        <Form.Group className="mb-3" controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control name={name} type="text" placeholder="Nom de l'événement"
                value={value}
                onChange={e => setValue(e)}
                required />
        </Form.Group>
    )
}

export default TextInput