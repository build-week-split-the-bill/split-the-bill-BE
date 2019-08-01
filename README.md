# Split The Bill Backend

[Visit Frontend](xxxx)
[Visit Backend](https://split-the-bill-postgres.herokuapp.com) (see endpoints below)

Split the bill is a fullstack web application that has been built during the WEB20 buildweek_3 (29.07.2019-02.08.2019) by [LambdaSchool](https://lambdaschool.com/) students. Each student fulfills a role in the project to collectively build the app. (Roles listed below)

Split The Bill provides a web application where people can easily calculate how much they have to pay. It splits a certain bill divided by the amount of people and gives them an overview how much they owe. A use case would be for example at a night out in a bar. As the fun and also alcohol level rises calculating the bill becomes more difficult and an app takes the tedious task away.

## Built With

- [HTML](https://en.wikipedia.org/wiki/HTML) - Foundation of the webpage
- [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) - Styling and sizing of the webpage
- [JSX](https://reactjs.org/docs/introducing-jsx.html) - Syntax extension to JavaScript for reactive DOM elements
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript) - Language used to make the webpage interactive
- [React.js](https://reactjs.org/) - JavaScript library for user interfaces
- [Redux](https://redux.js.org/) - A predictable state container for React
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk) - Redux Middleware for asynchronous state operations
- [Axios](https://github.com/axios/axios) - Promised based HTTP client to make requests to the backend
- [MDBReact](https://mdbootstrap.com/) - Material Design Bootstrap Framework for React
- [Axios-Progress-Bar](https://www.npmjs.com/package/axios-progress-bar) - A library to incluse a progress bar into the webpage that makes visualizes to the user after a HTTP request how long it will take for him to wait.

# Endpoints

### General

##### <span style="color:blue">GET [API RUNNING]</span>

```
https://split-the-bill-postgres.herokuapp.com/
```

- JWT protected (header) :x:
- payload (body) :x:

<span style="color:red">Example Response (200 OK)</span>:

```
Welcome to the production environment API of Split The Bill!
```

### USERS

##### <span style="color:blue">GET [ALL USERS]</span>

```
https://split-the-bill-postgres.herokuapp.com/api/users
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware - extra responses below
- No passwords are returned they are not even stored in the database directly

<span style="color:red">Example Response (200 OK)</span>:

```
{
    "users": [
        {
            "id": 1,
            "email": "sascha.majewsky@pm.me",
            "firstname": "sascha",
            "lastname": "majewsky"
        },
        {
            "id": 2,
            "email": "hanne.xxx@pm.me",
            "firstname": "hanne",
            "lastname": "xxx"
        }
    ]
}
```

<span style="color:red">Example Response (500 SERVER ERROR)</span>:

```
{
    error: "An error occurred during fetching all users. That one is on us!"
}
```

##### <span style="color:blue">GET [AN USER BY ID]</span>

```
https://split-the-bill-postgres.herokuapp.com/api/users/1
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- ID is defined over the used route at the end
- Authorization gets validated over restricted middleware - extra responses below
- USER ID gets validated over validateUserId middleware - extra responses below
- No passwords are returned they are not even stored in the database directly

<span style="color:red">Example Response (200 OK)</span>:

```
{
    "id": 1,
    "email": "sascha.majewsky@pm.me",
    "firstname": "sascha",
    "lastname": "majewsky"
}
```

<span style="color:red">Example Response (500 SERVER ERROR)</span>:

```
{
    error: "An error occurred during fetching an user with the id 1."
}
```

##### <span style="color:blue">POST [REGISTER AN USER]</span>

```
https://split-the-bill-postgres.herokuapp.com/api/users/register
```

- JWT protected (header) :x:
- payload (body) :heavy_check_mark:

<span style="color:green">Example Request</span>:

```
{
	"email": "kevin@test.com",
	"password": "correcthorsebatterystaple",
	"firstname": "kevin",
	"lastname": "tou"
}
```

<span style="color:red">Created User Response (201 CREATED)</span>:

```
{
    "id": 15,
    "email": "kevin@test.com",
    "firstname": "kevin",
    "lastname": "tou"
}
```

<span style="color:red">User data not complete Response (400 BAD REQUEST)</span>:

```
{
 "warning": "Not all information were provided to create a new user."
}
```

<span style="color:red">Server Error Response (500 SERVER ERROR)</span>:

```
{
"error": "An error occurred during the creation of a new user."
}
```

##### <span style="color:blue">POST [LOGIN AN USER]</span>

```

https://split-the-bill-postgres.herokuapp.com/api/users/login

```

- JWT protected (header) :x:
- payload (body) :heavy_check_mark:

<span style="color:green">Example Request</span>:

```

{
    "email": "kevin@test.com",
	"password": "correcthorsebatterystaple"
}

```

<span style="color:red">Logged In Response (200 OK)</span>:

```
{
    "message": "The user kevin@test.com successfully logged in!",
    "user": {
        "id": 11,
        "email": "kevin@test.com",
        "firstname": "kevin",
        "lastname": "tou"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMSwiZW1haWwiOiJrZXZpbkB0ZXN0LmNvbTY2NiIsImlhdCI6MTU2NDY4MTc1MCwiZXhwIjoxNTY0Njg1MzUwfQ.-DGabIPf9dXG38gx3t5Jq3xXwHzWLUwv1Zum0G_nkeE"
}
```

<span style="color:red">Example Response (401 UNAUTHORIZED)</span>:

```
{
    "warning": "Invalid credentials submitted for the login of an user."
}
```

<span style="color:red">Server Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred during logging in an user."
}
```

##### <span style="color:blue">PUT [UPDATE AN USER]</span>

```

https://split-the-bill-postgres.herokuapp.com/api/users/4

```

- JWT protected (header) :heavy_check_mark:
- payload (body) :heavy_check_mark:
- Authorization gets validated over restricted middleware - extra responses below
- USER ID gets validated over validateUserId middleware - extra responses below
- USER gets validated over validateUser middleware - extra responses below

<span style="color:green">Example Request</span>:

```
{
	"email": "changeduser@test.com",
	"firstname": "garry",
	"lastname": "squarepants"
}
```

<span style="color:red">Example Response (200 OK)</span>:

```
{
    "message": "The user with the id 1 has been successfully updated!"
}
```

<span style="color:red">Database Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred within the database thus the user with the id 1 could not be updated."
}
```

<span style="color:red">Server Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred during updating the user with the id 1."
}
```

##### <span style="color:blue">GET [BILLS OF AN USER BY ID]</span>

```
https://split-the-bill-postgres.herokuapp.com/api/users/3/bills
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware - extra responses below
- USER ID gets validated over validateUserId middleware - extra responses below
- ID is defined over the used route at the end

<span style="color:red">Found Bills Response (200 OK)</span>:

```
{
    [
        {
            "id": 1,
            "split_sum": 15.73,
            "split_people_count": 3,
            "created_at": "July 31st 2019, 11:39:09 pm",
            "user_id": 1,
            "user_email": "sascha.majewsky@pm.me"
        },
        {
            "id": 30,
            "split_sum": 15.5662,
            "split_people_count": 3,
            "created_at": "August 1st 2019, 12:41:14 pm",
            "user_id": 1,
            "user_email": "sascha.majewsky@pm.me"
        },
    ]
}
```

<span style="color:red">No bills found for the user Response (404 NOT FOUND)</span>:

```
{
    "info": "No bills are available for the user with the id 3."
}
```

<span style="color:red">Server Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred retrieving the bills for the user with the id 3."
}
```

### BILLS

##### <span style="color:blue">GET [ALL BILLS]</span>

```
https://split-the-bill-postgres.herokuapp.com/api/bills
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware - extra responses below

<span style="color:red">Example Response (200 OK)</span>:

```
{
    "bills": [
        {
            "id": 1,
            "split_sum": 15.73,
            "split_people_count": 3,
            "created_at": "July 31st 2019, 11:39:09 pm",
            "user_id": 1
        },
        {
            "id": 2,
            "split_sum": 33.35,
            "split_people_count": 2,
            "created_at": "July 31st 2019, 11:39:09 pm",
            "user_id": 2
        }
    ]
}
```

<span style="color:red">Server Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred during fetching all bills. That one is on us!"
}
```

##### <span style="color:blue">GET [A BILL BY ID]</span>

```
https://split-the-bill-postgres.herokuapp.com/api/bills/2
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- ID is defined over the used route at the end
- Authorization gets validated over restricted middleware - extra responses below
- BILL ID gets validated over validateBillId middleware - extra responses below

<span style="color:red">Example Response (200 OK)</span>:

```
{
    "id": 2,
    "split_sum": 33.35,
    "split_people_count": 2,
    "created_at": "July 31st 2019, 11:39:09 pm",
    "user_id": 2
}
```

<span style="color:red">Server Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred during fetching a bill with the id 2."
}
```

##### <span style="color:blue">POST [A NEW BILL]</span>

```
https://split-the-bill-postgres.herokuapp.com/api/bills/
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :heavy_check_mark:
- Authorization gets validated over restricted middleware - extra responses below
- BILL gets validated over validateBill middleware - extra responses below

<span style="color:green">Example Request</span>:

```
{
	"user_id": 1,
	"split_sum": 15.56618455214584,
	"split_people_count": 3
}
```

<span style="color:red">Example Response (200 OK)</span>:

```
{
    "id": 51,
    "user_id": 1,
    "split_sum": 15.5662,
    "split_people_count": 3,
    "created_at": "August 1st 2019, 6:19:19 pm"
}
```

<span style="color:red">Bill info not complete Response (400 BAD REQUEST)</span>:

```
{
    "warning": "Not all information were provided to create a new bill."
}
```

<span style="color:red">Server Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred during the creation of a new bill."
}
```

##### <span style="color:blue">DELETE [A BILL]</span>

```
https://split-the-bill-postgres.herokuapp.com/api/bills/15

```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware - extra responses below
- BILL ID gets validated over validateBillId middleware - extra responses below

<span style="color:red">Example Response (200 OK)</span>:

```
{
    "message": "The bill with the id of 2 was successfully deleted."
}
```

<span style="color:red">Server Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred during deletion of a bill with the id 1."
}
```

##### <span style="color:blue">PUT [UPDATE A BILL]</span>

```
https://split-the-bill-postgres.herokuapp.com/api/bills/4

```

- JWT protected (header) :heavy_check_mark:
- payload (body) :heavy_check_mark:
- BILL gets validated over validateBill middleware - extra responses below
- Authorization gets validated over restricted middleware - extra responses below
- BILL ID gets validated over validateBillId middleware - extra responses below

<span style="color:green">Example Request</span>:

```
{
	"split_sum": 400.22,
    "split_people_count": 2,
	"user_id": 1
}
```

<span style="color:red">Example Response (200 OK)</span>:

```
{
    "message": "The bill with the id 2 has been successfully updated!"
}
```

<span style="color:red">Database Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred within the database thus the bill with the id 1 could not be updated."
}
```

<span style="color:red">Server Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred during updating the bill with the id 1."
}
```

##### <span style="color:blue">GET [NOTIFICATIONS OF A BILL BY ID]</span>

```
https://split-the-bill-postgres.herokuapp.com/api/bills/2/notifications
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- ID is defined over the used route at the end
- Authorization gets validated over restricted middleware - extra responses below
- BILL ID gets validated over validateBillId middleware - extra responses below

<span style="color:red">Example Response (200 OK)</span>:

```
[
    {
        "id": 1,
        "email": "sascha@test.com",
        "bill_id": 1
    },
    {
        "id": 3,
        "email": "anotherfriend@test.com",
        "bill_id": 1
    }
]
```

<span style="color:red">Example Response (404 NOT FOUND)</span>:

```
{
    "info": "No bills available for the user with the id 2."
}
```

<span style="color:red">Server Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred during retrieving the bills for the user with the id 1."
}
```

##### <span style="color:blue">DELETE [ALL NOTIFICATIONS OF A BILL]</span>

```
https://split-the-bill-postgres.herokuapp.com/api/bills/31/notifications

```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware - extra responses below
- BILL ID gets validated over validateBillId middleware - extra responses below

<span style="color:red">Example Response (200 OK)</span>:

```
{
    "message": "The notification(s) for the bill with the id of 52 were successfully deleted."
}
```

<span style="color:red">Example Response (404 NOT FOUND)</span>:

```
{
    "info": "The bill of the id 52 does not contain any notifications."
}
```

<span style="color:red">Database Error Deletion of a notification Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred during retrieving the bills for the user with the id 52."
}
```

<span style="color:red">Server Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred during the deletion for notifications for the bill with the id 52."
}
```

### NOTIFICATIONS

##### <span style="color:blue">GET [ALL NOTIFICATIONS]</span>

```
https://split-the-bill-postgres.herokuapp.com/api/notifications
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware - extra responses below

<span style="color:red">Example Response (200 OK)</span>:

```
{
    "notifications": [
        {
            "id": 1,
            "email": "sascha@test.com",
            "bill_id": 1
        },
        {
            "id": 3,
            "email": "anotherfriend@test.com",
            "bill_id": 1
        }
    ]
}
```

<span style="color:red">Server Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred during fetching all notifications. That one is on us!"
}
```

##### <span style="color:blue">POST [AN ARRAY OF NOTIFICATIONS]</span>

```
https://split-the-bill-postgres.herokuapp.com/api/notifications
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :heavy_check_mark:
- BILL gets validated over validateBill middleware - extra responses below

<span style="color:green">Example Request</span>:

```
{
	"bill_id": 52,
	"email": ["friend_one@test.com", "friend_two@test.com", "friend_three@test.com"]
}
```

<span style="color:red">Example Response (200 OK)</span>:

```
{
    "message": "The notification(s) have been successfully persisted."
}
```

<span style="color:red">Notificaiton info not complete Response (400 BAD REQUEST)</span>:

```
{
    "warning": "Not all information were provided to create a new notification."
}
```

<span style="color:red">Server Error Response (500 SERVER ERROR)</span>:

```
{
    "error": "An error occurred during creating a new notification."
}
```

#### Middleware

Middleware is divided into 2 different types:

- Middleware that restricts access to certain routes for authorization
- Middleware that validates requests payloads.

Whenever for a route a certain ID or Resource object like a user is required these routes are protected by validation middleware and returning generic responses when used by badly shaped requests. Thus every endpoint documented has a indication of what generic validation responses it will provide when used incorrectly.

<span style="color:red">Bad Authorization Response (401 UNAUTHORIZED)</span>:

```
{
    "warning": "Authorization failed. Access denied!"
}
```

<span style="color:red">User validation no body data (400 BAD REQUEST)</span>:

```
{
    "warning": "Missing user data entirely."
}
```

<span style="color:red">User validation user data not complete (400 BAD REQUEST)</span>:

```
{
    "warning": "Missing required email or firstname or lastname information for an user."
}
```

#### JSON Responses

For JSON responses there are 4 different content types available:

- A JSON containing a **{ "id": 1, "email": "test@test.com" }** or **{ "resource": [{"id": 1, "email": "test@test.com"}, {"id": 2, "email": "test2@test.com"}] }** or **{ "message": "text" }** means that the request was successful and data is returned to the client. So the request **happened**.
- A JSON containing a { "**info**" : "text" } means that the request was semantically not useful as for example a deletion of no elements. It **happened** but was useless.
- A JSON containing a { "**warning**": "text"} means that something went wrong because of how the request was shaped and it **did not happen**.
- A JSON containing a { "**error**" : "text" } means that something went wrong internally during the request and it **did not happen**.

## Architecture and Workflow

The backend and database is handled by [Rogelio Caballero](https://github.com/rogercp) with a solution of Java Spring Boot and PostgreSQL. The backend is RESTful and will provide specific endpoints to communicate with the Frontend through HTTP requests and JSON-Objects. The backend is deployed at Heroku.

The Frontend is built by the authors mentioned below. It runs JavaScript and uses a State Driven Development (SDD) approach with React and React Redux. For the deployment a Continuous Deployment (CD) solution was chosen through [Netlify](https://www.netlify.com/) and then hosted under selfowned domains.

As working with 2 Frontend Developers the project progress needs to be commited in a way that keeps the amount of merge conflicts low. Thus before the project was built, design choices and modeling was done. The chosen branching strategy can be viewed [here](documentation/Branching_Strategy/branching-strategy-model.png). It was later further improved with the usage of Release Branches.
The project is chunked in user stories/tasks which are provided to a trello board for developers to assign these for themself.

Before the development started the Frontend Developers did modeling and planning for the application and created use cases, detailed technical descriptions for use cases, models of JSON-Objects and a flowchart for the states that the application can go through.

For the design aspect the group had a UX Design student dedicated to it who provided a design mockup for the whole application. The Frontend Developers tried to stick as close as possible to [this mockup](https://projects.invisionapp.com/share/U6SMIHDB2VJ#/screens).

## Project Requirements and Documentation

- [Initial Design Mockup from UX Designer](https://projects.invisionapp.com/share/U6SMIHDB2VJ#/screens)

- [Initial Project Description](https://docs.google.com/document/d/1HGTZDCltVTSM6LlF2qpyTJd8a17_B1iikEi_jIWlwOI/edit)

- Frontend Model and Planning - Directory "documentation"

- [Technical Design Documentation](documentation/Technical_Design_Documentation_Wanderlust.docx)

- [Grading/Rubric - Frontend Students](documentation/frontend-rubric-requirements.pdf)

- [Requirements and Milestones - Frontend Students](https://www.notion.so/Build-week-Schedule-and-Daily-Milestones-7f0aca2ad598459fa4492fdac9881d5b)

- [Policies and Procedures](https://www.notion.so/Build-Week-Culture-Document-19e679fc1a284b668d8132dd8d7228cd)

- [Daily Milestones](https://www.notion.so/Build-week-Schedule-and-Daily-Milestones-7f0aca2ad598459fa4492fdac9881d5b)

- [Retroperspective (Soon)]()

## Authors

**Role: Backend Developer**

- **[Sascha Majewsky](https://github.com/SaschaMajewsky)**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

```

```
