import axios from "axios";

const getEvents = async () => {
    let response = await axios.get("http://localhost:8080/events")
    return response.data;
}

const postEvent = async (event) => {
    let response = await axios.post("http://localhost:8080/events", event)
    return response.data;
}

const putEvent = async (event) => {
    let response = await axios.put(`http://localhost:8080/events/${event.id}`, event)
    return response.data;
}

const deleteEvent = (id) => {
    return axios.delete(`http://localhost:8080/events/${id}`);
}

export { getEvents, postEvent, putEvent, deleteEvent }