import { Card, Col, Row } from "react-bootstrap";

export default function PersonList({ name }) {
  return (
    <Card className="my-3">
      <Card.Body>
        <Row>
          <Col>{name}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
