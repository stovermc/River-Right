# River-Right Backend
#### This app is built with Node.js & Express.js; it provides an API to be used with the River Right Frontend.

## Node/Express Development Setup
1. Clone this repo
2. Navigate to the root directory
3. Install dependences `npm install` or `npm i`
4. Create databases
```
psql
CREATE DATABASE river_right;
CREATE DATABASE river_right_test;
```
5. Build the database
```
knex migrate:latest
knex migrate:latest --env test
```
6. Seed the database `knex seed:run`
7. Start the server `npm start`

## Mocha/Chai Testing
* Run tests with `npm test`
* Run all tests with `npm test test/*`
* Specify a test with `npm test test/<test-name>.js`

## API Endpoints
#### All endpoints are RESTful and all responses are in JSON format. Some important things to note:

* All API endpoints begin with `https://river-right-be.herokuapp.com/api/v1/`
* Requests are case sensitive

### Users
|**HTTP Verb/Method**|**URI Path**|**Description**|**Parameters**|
| --- | --- |:---:| --- |
|GET|users/:id|returns a user based on `id`|none|
|POST|users|adds a user to the database|`?email=<string>&password=<integer>`|
|PUT|users/:id|updates a food|`?email=<string>` or `?password=<integer>`|
|DELETE|users/:id|removes a user account from the database|

### Groups
|**HTTP Verb/Method**|**URI Path**|**Description**|**Parameters**|
| --- | --- |:---:| --- |
|GET|groups/:id|returns a group based on `id`|none|
|POST|groups|adds a group to the database|`?name=<string>`|
|PUT|groups/:id|updates a group|`?name=<string>`|
|DELETE|groups/:id|removes a group from the database|

### Group Members
|**HTTP Verb/Method**|**URI Path**|**Description**|**Parameters**|
| --- | --- |:---:| --- |
|POST|groupMembers|adds a group member to a group|`?user_id=<integer>&group_id=<integer>`|
|DELETE|groupMembers/:id|removes a group member from a group|

### Gear Types
|**HTTP Verb/Method**|**URI Path**|**Description**|**Parameters**|
| --- | --- |:---:| --- |
|GET|geartypes|returns all gear types|none|
|GET|geartypes/:id|returns all gear of a sing gear type|`?gear_type_id=<integer>&user_id=<integer>`

### UsersGearList
|**HTTP Verb/Method**|**URI Path**|**Description**|**Parameters**|
| --- | --- |:---:| --- |
|GET|usersGearList/:id|returns all the gear for a single user|`?user_id=<integer>`|
|POST|usersGearList|adds a piece of gear to a users gear list|`?user_id=<integer>&gear_item_id=<integer>`|
|DELETE|groups/:id|removes a piece of gear from a users gear list|`?gear_list_id=<integer>`
