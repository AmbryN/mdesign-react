import { Table, Button } from "react-bootstrap";

function TypesTable({ eventTypes, handleDelete }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Nom</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {eventTypes.map((type) => (
          <tr key={type.id}>
            <td>{type.id}</td>
            <td>{type.name}</td>
            <td>
              <Button
                value={type.id}
                variant="danger"
                onClick={(e) => handleDelete(e.target.value)}
              >
                Supprimer
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TypesTable;
