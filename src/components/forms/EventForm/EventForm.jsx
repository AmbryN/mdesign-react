import Form from 'react-bootstrap/Form'
import { useState } from "react";
import { EventType } from '../../../models/EventType'
import Button from "react-bootstrap/Button";
import TextInput from '../TextInput/TextInput.jsx';
import NumberInput from '../NumberInput/NumberInput.jsx';
import DateInput from '../DateInput/DateInput.jsx';
import TimeInput from '../TimeInput/TimeInput.jsx';
import Select from '../Select/Select.jsx';

function EventForm() {
    // const queryClient = useQueryClient();

    // const query: Address[] = useQuery('addresses', getAddresses);

    const [addresses, setAddresses] = useState([]);
    const typeEntries = Object.keys(EventType);
    // Form inputs
    const [nameInput, setNameInput] = useState("");
    const [typeSelect, setTypeSelect] = useState("");
    const [addressSelect, setAddressSelect] = useState("");
    const [soldHoursInput, setSoldHoursInput] = useState("");
    const [dateInput, setDateInput] = useState("");
    const [startTimeInput, setStartTimeInput] = useState("");
    const [endTimeInput, setEndTimeInput] = useState("");

    const handleSave = (e) => {
        e.preventDefault();
        if (nameInput !== "" && typeSelect !== ""
            && addressSelect !== "" && soldHoursInput !== "" && dateInput !== "") {
            const event = {
                "id": null,
                "name": nameInput,
                "address": {
                    "id": parseInt(addressSelect)
                },
                "date": new Date(dateInput),
                "soldHours": soldHoursInput,
                "type": typeSelect,
            }

            const request = new Request("http://localhost:8080/events", {
                method: 'POST',
                body: JSON.stringify(event),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })

            fetch(request)
                .then(res => res.json())
                .then(res => console.log(res))
        }
    }

    return (
        <Form>
            <TextInput label="Nom de l'événement" name="name" value={nameInput} setValue={setNameInput} />
            <Select label="Type" name="type" items={typeEntries} value={typeSelect} setValue={setTypeSelect} />
            <Select label="Lieu de l'événement" name="address" items={addresses} value={addressSelect} setValue={setAddressSelect} />
            <DateInput label="Date de l'événement" name="date" value={dateInput} setValue={setDateInput} />
            <NumberInput label="Nombre d'heures vendues" name="soldHours" value={soldHoursInput} setValue={setSoldHoursInput} />
            <TimeInput label="Heure de début" name="startTime" value={startTimeInput} setValue={setStartTimeInput} />
            <TimeInput label="Heure de fin" name="endTime" value={endTimeInput} setValue={setEndTimeInput} />
            <Button variant="primary" type="submit"
                onClick={handleSave}>Sauvegarder</Button>
        </Form>
    );
}

export default EventForm;
