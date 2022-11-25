import axios from "axios";
import baseUrl from "@api/base.jsx";

const getEvents = async () => {
  let response = await axios.get(`${baseUrl}/events`);
  return response.data;
};

const getEvent = async (id) => {
  let response = await axios.get(`${baseUrl}/events/${id}`);
  return response.data;
};

const getTodayEvents = async () => {
  let today = new Date(Date.now()).toISOString().slice(0, 10);
  let response = await axios.get(`${baseUrl}/events?date=${today}`);
  return response.data;
};

const postEvent = async (event) => {
  let response = await axios.post(`${baseUrl}/events`, event);
  return response.data;
};

const putEvent = async (event) => {
  let response = await axios.put(`${baseUrl}/events/${event.id}`, event);
  return response.data;
};

const deleteEvent = (id) => {
  return axios.delete(`${baseUrl}/events/${id}`);
};

export {
  getEvents,
  getEvent,
  getTodayEvents,
  postEvent,
  putEvent,
  deleteEvent,
};
