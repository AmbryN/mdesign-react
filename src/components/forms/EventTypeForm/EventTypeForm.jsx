import TextInput from '../TextInput/TextInput.jsx';
import {Alert, Form} from "react-bootstrap";

function EventTypeForm({eventType, setType, error}) {
    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setType({
            ...eventType,
            [name]: value
        })
    }

    return (
        <Form>
            {error && <Alert variant="danger">error.error</Alert>}
            <TextInput label="Nom du type" name="name" value={eventType.name} setValue={handleChange} />
        </Form>
    );
}

export default EventTypeForm;
