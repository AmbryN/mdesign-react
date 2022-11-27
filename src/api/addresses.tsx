import axios from "axios";
import { z } from "zod";
import { Address, AddressSchema } from "@api/models";

const addressArray = z.array(AddressSchema);

const getAddresses = async () => {
  let response = await axios.get("http://localhost:8080/addresses");
  return addressArray.parse(response.data);
};

const getAddressesWithTypeEvent = async () => {
  let response = await axios.get("http://localhost:8080/addresses?type=EVENT");
  return addressArray.parse(response.data);
};

const postAddress = async (address: Address) => {
  let response = await axios.post("http://localhost:8080/addresses", address);
  return AddressSchema.parse(response.data);
};

const putAddress = async (address: Address) => {
  let response = await axios.put(
    `http://localhost:8080/addresses/${address.id}`,
    address
  );
  return AddressSchema.parse(response.data);
};

const deleteAddress = async (id: string) => {
  const response = await axios.delete(`http://localhost:8080/addresses/${id}`);
  return response.data;
};

export {
  getAddresses,
  getAddressesWithTypeEvent,
  postAddress,
  putAddress,
  deleteAddress,
};
