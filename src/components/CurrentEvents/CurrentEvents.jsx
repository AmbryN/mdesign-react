import { Container, NavLink, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CurrentEvents({ events }) {
  return (
    <Container>
      <h1 className="my-3">Événements du jour</h1>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Type</th>
            <th>Adresse</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>

              <td>{event.name}</td>

              <td>{event.type.name}</td>
              <td>{`${event.address.number} ${event.address.street} ${event.address.postalCode} ${event.address.city}`}</td>
              <td>{event.date.toString()}</td>
              <td>
                <LinkContainer key={event.id} to={`/events/${event.id}`}>
                  <NavLink>
                    <Button variant="primary">Voir</Button>
                  </NavLink>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default CurrentEvents;