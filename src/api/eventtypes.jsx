import axios from "axios";

const getEventTypes = async () => {
    let response = await axios.get("http://localhost:8080/eventtypes")
    return response.data;
}

const postEventType = async (eventType) => {
    let response = await axios.post("http://localhost:8080/eventtypes", eventType)
    return response.data;
}

const putEventType = async (eventType) => {
    let response = await axios.put(`http://localhost:8080/events/${eventType.id}`, eventType)
    return response.data;
}

const deleteEventType = (id) => {
    return axios.delete(`http://localhost:8080/eventtypes/${id}`);
}

export { getEventTypes, postEventType, putEventType, deleteEventType }