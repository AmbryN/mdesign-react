import axios from "axios";
import { z } from "zod";
import { Address, AddressSchema } from "@api/models";
import baseUrl from "@api/baseUrl";
import { authHeader } from "@api/utils/auth.header";

const addressArray = z.array(AddressSchema);

const getAddresses = async () => {
  let response = await axios.get(`${baseUrl}/addresses`, {
    headers: authHeader(),
  });
  return addressArray.parse(response.data);
};

const getAddressesWithTypeEvent = async () => {
  let response = await axios.get(`${baseUrl}/addresses?type=EVENT`, {
    headers: authHeader(),
  });
  return addressArray.parse(response.data);
};

const postAddress = async (address: Address) => {
  let response = await axios.post(`${baseUrl}/addresses`, address, {
    headers: authHeader(),
  });
  return AddressSchema.parse(response.data);
};

const putAddress = async (address: Address) => {
  let response = await axios.put(
    `${baseUrl}/addresses/${address.id}`,
    address,
    { headers: authHeader() }
  );
  return AddressSchema.parse(response.data);
};

const deleteAddress = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/addresses/${id}`, {
    headers: authHeader(),
  });
  return response.data;
};

export {
  getAddresses,
  getAddressesWithTypeEvent,
  postAddress,
  putAddress,
  deleteAddress,
};
