
  <h1>Test project</h1>

Node.js v21.1.0<br/>

## Installation

```bash
$ yarn install
```

## Prerequisites

After installing dependencies you need first to provide file **.env** in the way shown in **.env.example** inside root directory.
```bash
# More likely you will use localhost
DB_HOST=<YOUR_DB_HOST>
# Default 5432 for postgres
DB_PORT=<YOUR_DB_PORT>
DB_USERNAME=<YOUR_DB_USERNAME>
DB_PASSWORD=<YOUR_DB_PASSWORD>
DB_NAME=<YOUR_DB_NAME>
# Salt for hashing password
BCRYPT_SALT=<USER_PASSWORD_HASH_SALT>
JWT_SECRET=<YOUR_JWT_SECRET>
```

## Running migrations

To run migrations:
```bash
$ yarn db:migrate
```


To drop database just in case:
```bash
$ yarn db:drop
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Endpoints
### Registration
_No authentication required_<br/>
**Method:** POST<br/>
**URL:** http://localhost:3000/api/auth/signUp <br/>
**Payload format:**
```json
{
    "user": {
        "firstname": "",
        "lastname": "",
        "email": "",
        "password": "",
        "role": "",
        "bossId": ""
    }
}
```
**Response format:**
```json
{
    "user": {
        "firstname": "",
        "lastname": "",
        "email": "",
        "role": "",
        "id": 1,
        "token": ""
    }
}
```
### Login & get JWT
_No authentication required_<br/>
**Method:** POST<br/>
**URL:** http://localhost:3000/api/auth/signIn <br/>
**Payload format:**
```json
{
  "user": {
    "email": "",
    "password": ""
  }
}
```
**Response format:**
```json
{
  "user": {
    "id": 1,
    "firstname": "",
    "lastname": "",
    "email": "",
    "token": ""
  }
}
```
### List of users (hierarchically)
_Authentication required_<br/>
**Method:** GET<br/>
**URL:** http://localhost:3000/api/user/details <br/>
**Headers:**
```json lines
{
  "Authorization": "Bearer <USER_JWT_HERE>"
}
```
**Response format for Administrator (diagram):**
```
├─admin
├─boss
│ ├─subordinate
│ └─subordinate
└─boss
  ├─subordinate
  ├─subordinate
  └─subordinate
```
**Response format for Boss (diagram):**
```
boss
├─subordinate
├─subordinate
└─subordinate
```
### Change Boss of the user
_Authentication required_<br/>
**Method:** PUT<br/>
**URL:** http://localhost:3000/api/user/change-boss <br/>
**Headers:**
```json lines
{
  "Authorization": "Bearer <USER_JWT_HERE>"
}
```
**Payload format:**
```json
{
  "user": {
    "userId": 9,
    "newBossId": 15
  }
}
```
**Response format:**
```json
{
  "id": 9,
  "firstname": "",
  "lastname": "",
  "email": "",
  "bossId": 15,
  "role": ""
}
```























