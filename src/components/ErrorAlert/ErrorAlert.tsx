import { Alert, Container } from "react-bootstrap";

function ErrorAlert({ errorMessage }: { errorMessage: string }) {
  return (
    <Container>
      <Alert variant="danger">Une erreur est survenue : {errorMessage}</Alert>
    </Container>
  );
}

export default ErrorAlert;
