# GyanGrove-assignment

# GitHub repository Link

https://github.com/vishnusharmi/GyanGrove-assignment.git

# A brief report explaining your choice of tech stack and database, highlighting any particular design decisions and how challenges were addressed.

# Node.js with Express.js:

Chosen for its understandable and efficiency in building scalability and fastest programming language in backend servers.

# MySQL:

Selected as the database it is easly manipilate due to its reliability, performance, and ease of use database.

# RESTful API Design:

The endpoints are designed following RESTful principles, making them intuitive and easy to use api's.

# Input Validation:

Implemented input validation to ensure that all required fields are provided and that latitude and longitude numbers.

# Asynchronous Operations:

i am used in this project async/await and Promise-based APIs to handle asynchronous database operations efficiently.

# Error Handling:

Implemented the error handling try catch format because you can handle debugging easly and process errors application performence improved

# Challenges Addressed:

# Input Validation and Sanitization:

Ensured that all required fields are present and that latitude and longitude are numbers is required

# Asynchronous Operations Handling:

Effectively managed asynchronous operations using async/await and Promise-based APIs, ensuring easly execution and error handling.

# External API Integration:

Handled errors and exceptions gracefully when fetching data from external APIs, ensuring robustness and reliability in the face of network failures or API changes.

# Setting Up and Running the Project:

# Prerequisites:

Node.js and npm should be install in your project. You can download and install them from Node.js website.
MySQL database server should be install and run in your accessible network.
Ensure you have access to the required environment variables for external APIs (e.g., weatherApiKey, distanceApiKey).

# Install Dependencies:

npm install

# Database Configuration:

Update the database configuration in databaseC.js file to connect to your MySQL database server.
Create the necessary database tables using SQL scripts provided.

# Environment Variables:

Create a .env file in the project root directory.
Add the required environment variables for external APIs (e.g., WEATHER_API_KEY, YOUR_DISTANCE_API_CODE).

# Run the Application:

nmp start

# API Endpoint Documentation:

Create Event Endpoint:

Endpoint: /events
Method: POST
Request Format:{
"event_name": "Event Name",
"city_name": "City Name",
"date": "YYYY-MM-DD",
"time": "HH:MM:SS",
"latitude": 123.456,  
 "longitude": 123.456  
}

# Response Format (Success):

Status Code: 200 OK
{
"message": "Event created successfully"
}

# Error Response Format:

Status Code: 400 Bad Request
{
"message": "The following fields are required: event_name, city_name, date, time, latitude, longitude"
}

Status Code: 500 Internal Server Error
{
"message": "Internal Server Error"
}

# Find Event Endpoint:

Endpoint:/event/find
Method: GET
Query Parameters:
page (optional): Page number for pagination
Request Format:{
"latitude": 123.456,  
 "longitude": 123.456,  
 "date": "YYYY-MM-DD"  
}

# Response Format (Success):

Status Code: 200 OK
{
"events": [
{
"event_name": "Event Name",
"city_name": "City Name",
"date": "YYYY-MM-DD",
"time": "HH:MM:SS",
"latitude": 123.456,
"longitude": 123.456,
"weather": "Weather Condition",
"distance_km": 123.45
},
events... example
],
"page": 1,
"pageSize": 10,
"totalEvents": 100,
"totalPages": 10
}

# Error Response Format:

Status Code: 400 Bad Request
{
"message": "Error message describing the issue"
}
Status Code: 422 "Unprocessable Entity"
{
"message": "Internal Server Error"
}
