import { Container, Spinner } from "react-bootstrap";

function LoadingSpinner() {
  return (
    <Container>
      <Spinner animation="border" role="status" />
    </Container>
  );
}

export default LoadingSpinner;
