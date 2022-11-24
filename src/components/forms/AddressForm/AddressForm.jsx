import TextInput from '../TextInput/TextInput.jsx';
import {Alert, Form} from "react-bootstrap";

function AddressForm({address, setAddress, error}) {
    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setAddress({
            ...address,
            [name]: value
        })
    }

    return (
        <Form>
            {error && <Alert variant="danger">Erreur : un ou des champs sont vides !</Alert>}
            <TextInput label="Nom de l'adresse" name="name" value={address.name} setValue={handleChange} />
            <TextInput label="Numéro de rue" name="number" value={address.number} setValue={handleChange} />
            <TextInput label="Rue" name="street" value={address.street} setValue={handleChange} />
            <TextInput label="Code Postal" name="postalCode" value={address.postalCode} setValue={handleChange} />
            <TextInput label="Ville" name="city" value={address.city} setValue={handleChange} />
        </Form>
    );
}

export default AddressForm;
