import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function AddressTable({addresses, handleUpdate, handleDelete}) {

    return (
        <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Numéro</th>
                <th>Rue</th>
                <th>Code Postal</th>
                <th>Ville</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {addresses.map(address =>
                <tr key={address.id}>
                    <td>{address.id}</td>
                    <td>{address.name}</td>
                    <td>{address.number}</td>
                    <td>{address.street}</td>
                    <td>{address.postalCode}</td>
                    <td>{address.city}</td>
                    <td>
                        <Button className="me-2" value={address.id} variant="warning"
                                onClick={e => handleUpdate(e.target.value)}>Modifier</Button>
                        <Button value={address.id} variant="danger"
                                onClick={e => handleDelete(e.target.value)}>Supprimer</Button>
                    </td>
                </tr>
            )}
            </tbody>
        </Table>
    )
}

export default AddressTable