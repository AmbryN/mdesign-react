import axios from "axios";
import baseUrl from "@api/base";
import { z } from "zod";
import { EventSchema, Event } from "@api/models";

const eventsArray = z.array(EventSchema);

const getEvents = async () => {
  let response = await axios.get(`${baseUrl}/events`);
  return eventsArray.parse(response.data);
};

const getEvent = async (id: string) => {
  let response = await axios.get(`${baseUrl}/events/${id}`);
  return EventSchema.parse(response.data);
};

const getTodayEvents = async () => {
  let today = new Date(Date.now()).toISOString().slice(0, 10);
  let response = await axios.get(`${baseUrl}/events?date=${today}`);
  return eventsArray.parse(response.data);
};

const postEvent = async (event: Event) => {
  let response = await axios.post(`${baseUrl}/events`, event);
  return response.data;
};

const putEvent = async (event: Event) => {
  let response = await axios.put(`${baseUrl}/events/${event.id}`, event);
  return response.data;
};

const deleteEvent = (id: string) => {
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
