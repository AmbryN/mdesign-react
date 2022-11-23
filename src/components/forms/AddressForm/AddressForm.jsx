import TextInput from '../TextInput/TextInput.jsx';
import {useMutation, useQueryClient} from "react-query";
import {postAddress, putAddress} from "../../../api/addresses.jsx";
import {Alert, Button, Form} from "react-bootstrap";
import {useState} from "react";

function AddressForm({address, setAddress, handleClose}) {
    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setAddress({
            ...address,
            [name]: value
        })
    }

    const queryClient = useQueryClient();
    // CRUD POST AND PUT
    const postQuery = useMutation(postAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries('addresses')
        },
    })

    const putQuery = useMutation(putAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries('addresses')
        },
    })

    // COMPONENT STATE
    const [formError, setFormError] = useState(false)

    const handleSubmit = () => {
        if (address.name !== ""
            && address.number !== ""
            && address.street !== ""
            && address.postalCode !== ""
            && address.city !== "") {
            if (address.id == null) {
                postQuery.mutate(address)
            } else {
                putQuery.mutate(address)
            }
            handleClose();
        } else {
            setFormError(true)
        }
    }

    return (
        <Form>
            {formError && <Alert variant="danger">Erreur : un ou des champs sont vides !</Alert>}
            <TextInput label="Nom de l'adresse" name="name" value={address.name} setValue={handleChange} />
            <TextInput label="Numéro de rue" name="number" value={address.number} setValue={handleChange} />
            <TextInput label="Rue" name="street" value={address.street} setValue={handleChange} />
            <TextInput label="Code Postal" name="postalCode" value={address.postalCode} setValue={handleChange} />
            <TextInput label="Ville" name="city" value={address.city} setValue={handleChange} />
            <Button variant="primary" onClick={handleSubmit}>Enregistrer</Button>
        </Form>
    );
}

export default AddressForm;
