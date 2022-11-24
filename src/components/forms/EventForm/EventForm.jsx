import TextInput from '../TextInput/TextInput.jsx';
import NumberInput from '../NumberInput/NumberInput.jsx';
import DateInput from '../DateInput/DateInput.jsx';
import TimeInput from '../TimeInput/TimeInput.jsx';
import Select from '../Select/Select.jsx';
import {Alert, Container, Form, Spinner} from "react-bootstrap";
import {useQuery} from "react-query";
import {getAddresses} from "../../../api/addresses.jsx";

function EventForm({event, setEvent, error}) {

    const {data: addresses, isLoading} = useQuery('addresses', getAddresses)
    const items = ["BORNE_ARCADE", "SUPPORTS_CULTURE_VERTICAUX"]

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        if (name !== "address") {
            setEvent({
                ...event,
                [name]: value
            })
        } else {
            setEvent({
                ...event,
                address: addresses.find(address => address.id == value)
            })
        }
    }

    if (isLoading) return <Container><Spinner animation="border" role="status"/></Container>

    return (
        <Form>
            {error && <Alert variant="danger">Erreur : un ou des champs sont vides !</Alert>}
            <TextInput label="Nom de l'événement" name="name" value={event.name} setValue={handleChange} />
            <Select label="Type" name="type" items={items} value={event.type} setValue={handleChange} />
            <Select label="Lieu de l'événement" name="address" items={addresses} value={event.address} setValue={handleChange} />
            <DateInput label="Date de l'événement" name="date" value={event.date} setValue={handleChange} />
            <NumberInput label="Nombre d'heures vendues" name="soldHours" value={event.soldHours} setValue={handleChange} />
            <TimeInput label="Heure de début" name="startTime" value={event.startTime} setValue={handleChange} />
            <TimeInput label="Heure de fin" name="endTime" value={event.endTime} setValue={handleChange} />
            <TextInput label="Url" name="url" value={event.url} setValue={handleChange} />
        </Form>
    );
}

export default EventForm;
