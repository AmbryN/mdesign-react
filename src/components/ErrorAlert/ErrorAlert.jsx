import { Alert, Container } from "react-bootstrap";

function ErrorAlert({ error }) {
  return (
    <Container>
      <Alert variant="danger">Une erreur est survenue : {error.message}</Alert>
    </Container>
  );
}

export default ErrorAlert;
