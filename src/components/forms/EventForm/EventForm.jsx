import TextInput from '../TextInput/TextInput.jsx';
import NumberInput from '../NumberInput/NumberInput.jsx';
import DateInput from '../DateInput/DateInput.jsx';
import TimeInput from '../TimeInput/TimeInput.jsx';
import Select from '../Select/Select.jsx';
import {Alert, Form} from "react-bootstrap";
import {useQuery} from "react-query";
import {getAddressesWithTypeEvent} from "../../../api/addresses.jsx";
import {getEventTypes} from "../../../api/eventtypes.jsx";

function EventForm({event, setEvent, error}) {

    const {data: addresses, isLoading: addressesLoading} = useQuery(['addresses', {type: "EVENT"}], getAddressesWithTypeEvent)
    const {data: eventTypes, isLoading: eventTypesLoading} = useQuery(['eventTypes'], getEventTypes)

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        if (name === "address") {
            setEvent({
                ...event,
                address: addresses.find(address => address.id == value)
            })
        } else if (name === "type") {
            setEvent({
                ...event,
                type: eventTypes.find(type => type.id == value)
            })
        } else {
            setEvent({
                ...event,
                [name]: value
            })
        }
    }

    return (
        <Form>
            {error && <Alert variant="danger">Erreur : un ou des champs sont vides !</Alert>}
            <TextInput label="Nom de l'événement" name="name" value={event.name} setValue={handleChange}/>
            <Select label="Type" name="type" items={eventTypes || []} value={event.type} setValue={handleChange}/>
            <Select label="Lieu de l'événement" name="address" items={addresses || []} value={event.address}
                    setValue={handleChange}/>
            <DateInput label="Date de l'événement" name="date" value={event.date} setValue={handleChange}/>
            <NumberInput label="Nombre d'heures vendues" name="soldHours" value={event.soldHours}
                         setValue={handleChange}/>
            <TimeInput label="Heure de début" name="startTime" value={event.startTime} setValue={handleChange}/>
            <TimeInput label="Heure de fin" name="endTime" value={event.endTime} setValue={handleChange}/>
            <TextInput label="Url" name="url" value={event.url} setValue={handleChange}/>
        </Form>
    );
}

export default EventForm;
