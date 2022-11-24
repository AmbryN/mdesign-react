export default class Address {

    constructor({ id, name, number, street, postalCode, city }) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.street = street;
        this.postalCode = postalCode;
        this.city = city;
    }

    toString() {
        return `${this.number} ${this.street} ${this.postalCode} ${this.city}`;
    }
}