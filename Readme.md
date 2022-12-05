# MDesign - React Frontend

Single page application build with React for interacting with a REST API (built with Java Spring).

## Use case

MDesign is a Fablab based in Metz (France) which organizes events for makers, schools and public institutions.

Every month, a report containing information about all these events (number of attendees, mean age, 
gender repartition, targeted neighborhoods etc.) has to be provided to official institution (e.g. state, region).
To speed up the storage, retrieval and analysis of this data, I was tasked to develop a web application,
which will help Fablab employees with these tasks.

## Features

### Working features
* Fetching, Adding, Editing and Deleting data (CRUD) in collaboration with the Spring backend REST API, for instance:
  * Event types,
  * Addresses,
  * Events with their corresponding attendees' and hosts' lists
* Displaying MDesign's specific query results
* Authentication using JWT between the fronted app and the backend.

### Planned features
* Generating a CSV file with the query result

## Built With

* [React](https://fr.reactjs.org/)
* [React-Router](https://github.com/binance/binance-connector-java)
* [React-Query](https://react-query-v3.tanstack.com/)
* [Tailwindcss](https://tailwindcss.com)

## Authors

* **AmbryN** - *Initial work* - [AmbryN](https://github.com/AmbryN)