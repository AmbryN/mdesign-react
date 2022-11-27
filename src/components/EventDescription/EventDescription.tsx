import { Card, Col, Row } from "react-bootstrap";

export default function EventDescription({ event }) {
  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>
          <Row>
            <Col>Type : {event.type.name}</Col>
            <Col>Date : {event.date.toString()}</Col>
          </Row>
          <Row>
            <Col>
              Adresse :
              {`${event.address.number} ${event.address.street} ${event.address.postalCode} ${event.address.city}`}
            </Col>
          </Row>
          <Row>
            <Col>Heures vendues : {event.soldHours} heures</Col>
            <Col>
              Heures réalisées : {event.endTime - event.startTime} heures
            </Col>
          </Row>
          <Row>
            <Col>Heure début : {event.startTime}</Col>
            <Col>Heure fin : {event.endTime}</Col>
          </Row>
          <Row>
            <Col>
              Url : <a href={event.url}>{event.url}</a>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
