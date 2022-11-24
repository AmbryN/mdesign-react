import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function EventTable({events, handleUpdate, handleDelete}) {
    return (
        <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Type</th>
                <th>Adresse</th>
                <th>Date</th>
                <th>Heures vendues</th>
                <th>Heure début</th>
                <th>Heure fin</th>
                <th>URL</th>
                <th>Actions</th>

            </tr>
            </thead>
            <tbody>
            { events.map(event =>
                <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.name}</td>
                    <td>{event.type}</td>
                    <td>{`${event.address.number} ${event.address.street} ${event.address.postalCode} ${event.address.city}`}</td>
                    <td>{event.date.toString()}</td>
                    <td>{event.soldHours}</td>
                    <td>{event.startTime ? event.startTime.toString() : ""}</td>
                    <td>{event.endTime ? event.endTime.toString() : ""}</td>
                    <td>{event.url}</td>
                    <td>
                        <Button className="me-2" value={event.id} variant="warning"
                                onClick={e => handleUpdate(e.target.value)}>Modifier</Button>
                        <Button value={event.id} variant="danger"
                                onClick={e => handleDelete(e.target.value)}>Supprimer</Button>
                    </td>
                </tr>
            ) }
            </tbody>
        </Table>
    )
}

export default EventTable