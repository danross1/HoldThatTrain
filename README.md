# HoldThatTrain!

HoldThatTrain! is a React webapp that uses MetroTranit's NextTrip API to get real-time departures of the MetroTransit light rail system and alerts the user a specified amount of time before their train arrives via text message.

## Technologies Used
* React  
* Express  
* PostgreSQL  
* Material UI
* NextTrip API
* Twilio
* Moment.js

## Getting Started
### Prerequisites
* Node.js
* Postico (or your preferred PostgresSQL client)
* A [Twilio](https://www.twilio.com/try-twilio) account

### Installation
1. Fork and clone this repo to your machine.
2. From your CLI, run `npm install`.
3. While this is installing, open Positico and create a new database called 'HoldThatTrain'.  Note: if you wish to use another database title, you will need to update line 33 of the pool.js file with the new name.
4. In Postico, run the SQL queries provided below and in the database.sql file to create the necessary tables.
5. In the cloned project's root directory, create a .env file with the following code:
```
SERVER_SESSION_SECRET=YOUR_SECRET_HERE
TWILIO_ACCOUNT_SID=YOUR_ACCOUNT_SID
TWILIO_AUTH_TOKEN=YOUR_AUTH_TOKEN
```
6. Replace `YOUR_SECRET_HERE` with a random string and `YOUR_ACCOUNT_SID` and `YOUR_AUTH_TOKEN` with your Twilio SID and auth token, respectively.
7. In your CLI, run the command `npm run server` then, in a new tab, `npm run client`.  If this does not automatically bring you to http://localhost:3000/, go there and get ready to HoldThatTrain!