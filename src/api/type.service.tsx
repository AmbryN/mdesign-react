import axios from "axios";

import { EventType, EventTypeSchema } from "@api/models";
import { z } from "zod";
import baseUrl from "@api/baseUrl";
import { authHeader } from "@api/utils/auth.header";

const eventTypesArray = z.array(EventTypeSchema);

const getEventTypes = async () => {
  let response = await axios.get(`${baseUrl}/types`, { headers: authHeader() });
  return eventTypesArray.parse(response.data);
};

const postEventType = async (eventType: EventType) => {
  let response = await axios.post(`${baseUrl}/types`, eventType, {
    headers: authHeader(),
  });
  return EventTypeSchema.parse(response.data);
};

const deleteEventType = (id: string) => {
  return axios.delete(`${baseUrl}/types/${id}`, { headers: authHeader() });
};

export { getEventTypes, postEventType, deleteEventType };
