import {Table} from "react-bootstrap";

function EventTable({events}) {
    return (
        <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
            </thead>
            <tbody>
            { events.map((event, index) =>
                <tr key={index}>
                    <td>{event.id}</td>
                    <td>{event.name}</td>
                    <td>{event.address}</td>
                </tr>
            ) }
            </tbody>
        </Table>
    )
}

export default EventTable