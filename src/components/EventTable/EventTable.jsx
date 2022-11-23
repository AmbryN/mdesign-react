import {Table} from "react-bootstrap";

function EventTable({events}) {
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
                </tr>
            ) }
            </tbody>
        </Table>
    )
}

export default EventTable