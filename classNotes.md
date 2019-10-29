# Auth and Queues + Stacks

## Queues and Stacks

### Abstract Data Structures

- What is an Abstract Data Structure?
  - Only defined by it's behaviour, not a specific implementation

#### Stack

- A stack has the behaviour: FiLo (First in, Last out)
  - Whatever object is pushed onto the stack will the last to be popped
    - Push (adds an item to the stack)
    - Pop (removes an item from the stack)
    - Peak (look at what is in the stack)
    - Top and a Bottom

#### Queue

- A queue has the behaviour: FiFo (First in, First out)
  - Whatever object is enqueued into the queue will be the first object to be dequeued
    - Enqueue (adds an item to the rear of the queue)
    - Dequeue (removes an item from the front the queue)
    - Tracks a rear and a front

Request ('/users') -> Middleware (requestTime) -> Response (handleUsers)

```js
app.get('/users', requestTime, handleUsers);
```

## Auth

- Authentication: Who are you?
- Authorization: Are you allowed to do what you are trying to do (Based on who you are)?

### String Based Authentication

- We have the user make a user object
  - username
  - password
  - sent to our service as an encrypted string
- Then we need to parse the string and decide, is this a new user or an existing user
- Creating an one way encrypted tocken, which the user can store and use for all auth requests

## Random Notes

- app.js - gathers our dependencies in one place and exporting id
  - books.js - handling all routing logic and the logic that runs while they are called
    - (sits between book.js and users-model.js) middleware - any functionality we need between request and response
  - users-model.js - connecting to database, handling our persistence layer (defining properties that are on that model)
