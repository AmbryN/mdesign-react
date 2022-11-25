import axios from "axios";

const getEventTypes = async () => {
  let response = await axios.get("http://localhost:8080/types");
  return response.data;
};

const postEventType = async (eventType) => {
  let response = await axios.post("http://localhost:8080/types", eventType);
  return response.data;
};

const deleteEventType = (id) => {
  return axios.delete(`http://localhost:8080/types/${id}`);
};

export { getEventTypes, postEventType, deleteEventType };
