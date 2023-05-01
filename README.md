# Intelligent Map Advisor
DES421 Location-based Services and Digital Mapping term project.

## Project Members
- Levin Kaus [@levinKaus](https://github.com/levinKaus) (6522808210) (Role: Backend & Database)
- Leon Wirz [@conancom](https://github.com/conancom) (6222782169) (Role: Backend & APIs)
- Chayud Srisumarnk [@chayudG](https://github.com/chayudG) (6222781922) (Role: Frontend Design)
- Sirapop Lahankaew [@jjmmy](https://github.com/jjmmy) (6222782953) (Role: Frontend)

## Application Demo
[Intelligent Map Advisor on Azure Static Web Apps](https://orange-dune-0b5149b00.2.azurestaticapps.net/)

## Setup Front-end

The Front-end code resides in the app directory. To setup and start the project the following is required:

1) Run `npm install` in the app folder (If there are any issues regarding Material UI try `npm install -f`)

2) Run `npm start` to start the dev server.

3) Done.

## Setup Back-end

The Back-end code resides in the api directory. To setup and start the project the following is required:

1) Run `npm install` in the api folder

2) Create the `.env` file and put all the Envrinment variables in there:
  - Open AI Key
  - Google Geocode Key
  - Cosmos DB Key

3) To run the API server locally, azure-functions-core-tools is needed. You can install it in various ways, we use npm: `npm install azure-functions-core-tools -g`

4) Run `func init` to initialize the local environment.

5) Run `npm start` or `func start` to start the dev server.

6) Done.
`
