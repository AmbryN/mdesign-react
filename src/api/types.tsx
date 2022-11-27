import axios from "axios";

import { EventType, EventTypeSchema } from "@api/models";
import { z } from "zod";

const eventTypesArray = z.array(EventTypeSchema);

const getEventTypes = async () => {
  let response = await axios.get("http://localhost:8080/types");
  return eventTypesArray.parse(response.data);
};

const postEventType = async (eventType: EventType) => {
  let response = await axios.post("http://localhost:8080/types", eventType);
  return EventTypeSchema.parse(response.data);
};

const deleteEventType = (id: string) => {
  return axios.delete(`http://localhost:8080/types/${id}`);
};

export { getEventTypes, postEventType, deleteEventType };
