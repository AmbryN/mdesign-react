import {useState} from "react";
import {Alert, Spinner, Button, Container} from "react-bootstrap";
import AddressTable from "../../components/AddressTable/AddressTable";
import AddressForm from "../../components/forms/AddressForm/AddressForm.jsx";
import FormModal from "../../components/layout/FormModal/FormModal";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getAddresses, deleteAddress} from "../../api/addresses.jsx";

function Addresses() {
    // Query for addresses in DB
    const queryClient = useQueryClient();
    const {data: addresses, isLoading, isError, error} = useQuery('addresses', getAddresses);

    // CRUD DELETE
    const deleteQuery = useMutation(deleteAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries('addresses')
        },
    })

    // Event handlers
    const handleUpdate = (id) => {
        setAddress(addresses.find(address => address.id == id))
        setShowModal(true)
    }

    const handleDelete = (id) => {
        deleteQuery.mutate(id)
    }

    // Component state
    const [showModal, setShowModal] = useState(false)
    const [address, setAddress] = useState({})

    const handleNewAddress = () => {
        setAddress({
            id: null,
            name: "",
            number: "",
            street: "",
            postalCode: "",
            city: ""
        })
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    if (isLoading) return <Container><Spinner animation="border" role="status"/></Container>

    if (isError) return <Container><Alert variant="danger">Une erreur est survenue : {error.message}</Alert></Container>

    return (
        <Container>
            {deleteQuery.isError &&
                <Alert variant="danger">Une erreur est survenue : {deleteQuery.error.message}</Alert>}
            <Button className="my-3" variant="primary" onClick={handleNewAddress}>Créer une nouvelle adresse</Button>
            <AddressTable addresses={addresses} handleUpdate={handleUpdate} handleDelete={handleDelete}/>

            {showModal
                &&
                <FormModal title="Ajouter une adresse" show={showModal}
                           handleClose={handleClose}>
                    <AddressForm address={address} setAddress={setAddress} handleClose={handleClose}></AddressForm>
                </FormModal>
            }
        </Container>
    )
}

export default Addresses