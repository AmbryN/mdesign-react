import Address from "./Address";

export default interface Person {
    id: number;
    firstName: string;
    lastName: string;
    gender: Gender;
    dateOfBirth: Date;
    email: string;
    phone: string;
    address: Address;
    type: PersonType;
}