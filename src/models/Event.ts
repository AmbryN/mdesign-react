import Address from "./Address";
import Person from "./Person";
import {EventType} from "./EventType";

export default interface Event {
    id: number;
    name: string;
    address: Address;
    date: Date;
    soldHours: number;
    startTime?: Date;
    endTime?: Date;
    participants: [Person];
    url?: string;
    type: EventType;
}