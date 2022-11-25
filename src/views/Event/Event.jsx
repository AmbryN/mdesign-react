import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";

import { getEvent } from "@api/events.jsx";
import LoadingSpinner from "@components/Spinner/LoadingSpinner";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert.jsx";

function Event() {
  const { id } = useParams();
  const {
    data: event,
    isLoading,
    isError,
  } = useQuery(["event", id], () => getEvent(id));

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorAlert error={isError} />;

  return (
    <Container>
      <Row>
        <Col>{event.name}</Col>
      </Row>
      <Row>
        <Col>{event.type.name}</Col>
        <Col>{event.date.toString()}</Col>
      </Row>
      <Row>
        <Col>
          {`${event.address.number} ${event.address.street} ${event.address.postalCode} ${event.address.city}`}
        </Col>
      </Row>
      <Row>
        <Col>{event.soldHours}</Col>
        <Col>{event.startTime}</Col>
        <Col>{event.endTime}</Col>
      </Row>
      <Row>
        <Col>{event.url}</Col>
      </Row>
      <Row>
        <Col>Participants</Col>
      </Row>
      <Row>
        <Col>Animateurs</Col>
      </Row>
    </Container>
  );
}

export default Event;
