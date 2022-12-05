import axios from "axios";
import { z } from "zod";

import { Person, PersonSchema } from "@api/models";
import baseUrl from "@api/baseUrl";
import { authHeader } from "@api/utils/auth.header";

const personsArray = z.array(PersonSchema);

const getPersons = async () => {
  let response = await axios.get(`${baseUrl}/persons`, {
    headers: authHeader(),
  });
  return personsArray.parse(response.data);
};

const postPerson = async (person: Person) => {
  let response = await axios.post(`${baseUrl}/persons`, person, {
    headers: authHeader(),
  });
  return response.data;
};

const getParticipants = async (eventId: string) => {
  let response = await axios.get(`${baseUrl}/events/${eventId}/participants`, {
    headers: authHeader(),
  });
  return personsArray.parse(response.data);
};

const postParticipant = async (eventId: string, participant: Person) => {
  let response = await axios.post(
    `${baseUrl}/events/${eventId}/participants`,
    participant,
    { headers: authHeader() }
  );
  return response.data;
};

const deleteParticipant = async (eventId: string, participantId: number) => {
  let response = await axios.delete(
    `${baseUrl}/events/${eventId}/participants/${participantId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const getHosts = async (eventId: string) => {
  let response = await axios.get(`${baseUrl}/events/${eventId}/hosts`, {
    headers: authHeader(),
  });
  return personsArray.parse(response.data);
};

const postHost = async (eventId: string, host: Person) => {
  let response = await axios.post(`${baseUrl}/events/${eventId}/hosts`, host, {
    headers: authHeader(),
  });
  return response.data;
};

const deleteHost = async (eventId: string, participantId: number) => {
  let response = await axios.delete(
    `${baseUrl}/events/${eventId}/hosts/${participantId}`,
    { headers: authHeader() }
  );
  return response.data;
};

const getPersonByName = async (name: string) => {
  let response = await axios.get(`${baseUrl}/persons?name=${name}`, {
    headers: authHeader(),
  });
  return personsArray.parse(response.data);
};

export {
  getPersons,
  postPerson,
  getParticipants,
  postParticipant,
  deleteParticipant,
  getHosts,
  postHost,
  deleteHost,
  getPersonByName,
};
