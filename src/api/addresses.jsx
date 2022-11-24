import axios from "axios";

const getAddresses = async () => {
    let response = await axios.get("http://localhost:8080/addresses")
    return response.data;
}

const getAddressesWithTypeEvent = async () => {
    let response = await axios.get("http://localhost:8080/addresses?type=EVENT")
    return response.data
}

const postAddress = async (address) => {
    let response = await axios.post("http://localhost:8080/addresses", address)
    return response.data;
}

const putAddress = async (address) => {
    let response = await axios.put(`http://localhost:8080/addresses/${address.id}`, address)
    return response.data;
}

const deleteAddress = (id) => {
    return axios.delete(`http://localhost:8080/addresses/${id}`);
}

export { getAddresses, getAddressesWithTypeEvent, postAddress, putAddress, deleteAddress }