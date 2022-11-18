import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function EventForm() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="lastname">
                <Form.Label id="lastname" name="lastname">Nom</Form.Label>
                <Form.Control type="text" placeholder="Votre nom"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstname">
                <Form.Label id="firstname" name="firstname">Prénom</Form.Label>
                <Form.Control type="text" placeholder="Votre prénom"/>
            </Form.Group>
            <Button variant="primary">Enregistrer</Button>
        </Form>
    );
}

export default EventForm;
