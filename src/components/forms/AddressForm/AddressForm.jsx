import Form from 'react-bootstrap/Form'
import * as React from "react";
import TextInput from '../TextInput/TextInput.jsx';

function AddressForm({address, setAddress}) {
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
            <TextInput label="Nom de l'adresse" name="name" value={address.name} setValue={handleChange} />
            <TextInput label="Numéro de rue" name="number" value={address.number} setValue={handleChange} />
            <TextInput label="Rue" name="street" value={address.street} setValue={handleChange} />
            <TextInput label="Code Postal" name="postalCode" value={address.postalCode} setValue={handleChange} />
            <TextInput label="Ville" name="city" value={address.city} setValue={handleChange} />
        </Form>
    );
}

export default AddressForm;
