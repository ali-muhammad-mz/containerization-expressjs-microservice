# containerization of express api

Containerization of simple REST API in Node.js

API Endpoints

| Methods     | Urls             |Description            |
| ----------- | -----------      | -----------        |
| GET         | api/employees    |Get all employees           |
| GET         | api/employees/id |Get a specific employee         |
| POST        | api/employees    |Create a new employee         |
| PUT        | api/employees/id    |Update an existing employee|
| DELETE        | api/employees/id    |Delete an existing employee|

## Quick Start

Clone the repo.

```bash
https://github.com/zagaris/express-api.git
cd express-api
```
Install the dependencies.

```bash
npm install
```
To build the container, run the following.

```cmd
cd ..
docker build -f src/docker/Dockerfile -t employee-api .
docker run --name employees-service -e PORT=5000 -p 5000:5000 employee-api
```

To view the logs of the service

```bash
docker logs employees-service
```
