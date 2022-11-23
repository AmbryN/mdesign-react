import {useState} from "react";
import {Alert, Spinner, Button, Container} from "react-bootstrap";
import AddressTable from "../../components/AddressTable/AddressTable";
import AddressForm from "../../components/forms/AddressForm/AddressForm.jsx";
import FormModal from "../../components/layout/FormModal/FormModal";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getAddresses, postAddress, deleteAddress, putAddress} from "../../api/addresses.jsx";

function Addresses() {
    const queryClient = useQueryClient();
    // Query for addresses in DB
    const {data: addresses, isLoading, isError, error} = useQuery('addresses', getAddresses);

    // CRUD Mutations
    const postQuery = useMutation(postAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries('addresses')
        },
    })

    const putQuery = useMutation(putAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries('addresses')
        },
    })

    const deleteQuery = useMutation(deleteAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries('addresses')
        },
    })

    // Event handlers
    const handleNew = () => {
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

    const handleSave = () => {
        if (address.name !== ""
            && address.number !== ""
            && address.street !== ""
            && address.postalCode !== ""
            && address.city !== "") {
            if (address.id == null) {
                postQuery.mutate(address)
            } else {
                putQuery.mutate(address)
            }
            setShowModal(false);
        } else {
            setFormError(true)
        }
    }

    const handleUpdate = (id) => {
        setAddress(addresses.find(address => address.id == id))
        setShowModal(true)
    }

    const handleDelete = (id) => {
        deleteQuery.mutate(id)
    }

    // Component state
    const [showModal, setShowModal] = useState(false)
    const [formError, setFormError] = useState(false)
    const [address, setAddress] = useState({})

    const handleClose = () => {
        setShowModal(false);
        setFormError(false);
    }


    if (isLoading) return <Container><Spinner animation="border" role="status"/></Container>

    if (isError) return <Container><Alert variant="danger">Une erreur est survenue : {error.message}</Alert></Container>

    return (
        <Container>
            {deleteQuery.isError &&
                <Alert variant="danger">Une erreur est survenue : {deleteQuery.error.message}</Alert>}
            {putQuery.isError && <Alert variant="danger">Une erreur est survenue : {putQuery.error.message}</Alert>}
            <Button className="my-3" variant="primary" onClick={handleNew}>Créer une nouvelle adresse</Button>
            <AddressTable addresses={addresses} handleUpdate={handleUpdate} handleDelete={handleDelete}/>

            {showModal
                &&
                <FormModal title="Ajouter une adresse" show={showModal} error={formError} handleSave={handleSave}
                           handleClose={handleClose}>
                    <AddressForm address={address} setAddress={setAddress}></AddressForm>
                </FormModal>
            }
        </Container>
    )
}

export default Addresses