# Valid backend calls:

## GET /db/
    - development only
        - don't leave a call to this in the finished product
    - returns all the json data

## Users

### GET /db/users
    - development only
        - don't leave a call to this in the finished product
    - returns all the user data for every user

### PUT /db/users/id
    - changes nothing
        - should be a get but axios dosen't let get requests contain a body
    - body must be a json object with the format:
    {
        username: (String) (Optional),
        email: (String) (Optional)
    }
    - returns a json object of the user id for the user that matches the sent data with the format:
    {
        id: (int)
    }
    - returns an error if the user is unfindable or abmiguous

### GET /db/users/:user
    - authentication to be added
        - calls to this may need to be modified
    - returns the data for a specific user

### GET /db/:user/groups
    - authentication to be added
        - calls to this may need to be modified
    - returns all the data for every group a specific user is in
        - null if there are none

### PUT /db/users/username
    - Change Username for a specific user
    - body must be a JSON object with the format:
    {
        userId: (int),
        username: (String)
    }
    - untested
        - contact me if you have an error with it

### PUT /db/users/password
    - Change password for a specific user
    - body must be a JSON object with the format:
    {
        userId: (int),
        password: (String)
    }
    - untested
        - contact me if you have an error with it

### POST /db/users
    - adds a new user to the list of users
    - body must be a JSON object with the format:
    {
        username: (String),
        password: (String)
    }

### DELETE /db/users/:user
    - removes a user from the list of users
    - untested
        - contact me if you have an error with it

## Groups

### GET /db/groups
    - development only
        - don't leave a call to this in the finished product
    - returns all the group data for every group

### GET /db/groups/:group
    - authentication to be added
        - calls to this may need to be modified
    - returns the data for a specific group

### GET /db/groups/:group/isOneToOne
    - returns a json object with the format:
    {
        chat: (Boolean)
    }

### POST /db/groups
    - adds a new group to the list of groups
    - body must be a JSON object with the format:
    {
        founderId: (Int),
        founderName: (String)
    }
    - untested
        - contact me if you have an error with it

### DELETE /db/groups/:group
    - deletes a specific group

## Members

### PUT /db/groups/:group/rename
    - changes a specific user's nickname for a specific group
    - body must be a JSON object with the format:
    {
        memberId: (Int),
        memberName: (String)
    }
    - untested
        - contact me if you have an error with it

### POST /db/groups/:group/invite
    - adds a new member to a specific group
    - body must be a JSON object with the format:
    {
        memberId: (Int),
        memberName: (String)
    }
    - untested
        - contact me if you have an error with it

### DELETE /db/groups/:group/ban/:user
    - Removes a user from a group if they are there
    - body must be a JSON object with the format:
    {
        memberId: (Int)
    }
    - untested
        - contact me if you have an error with it

## Messages

### GET /db/groups/:group/latest/message
    - authentication to be added
        - calls to this may need to be modified
    - returns the latest message for a specific group
        - null if there are none
    - to do
        - needs a timeSent field to be added to the message object

### PUT /db/groups/:group/:message/edit
    - Replaces the content of the specified message
    - body must be a JSON object with the format:
    {
        content: (String)
    }
    - untested
        - contact me if you have an error with it

### POST /db/groups/:group/post
    - adds a new message to a specific group
    - body must be a JSON object with the format:
    {
        content: (String),
        authorId: (Int),
        timestamp: (Time)
    }
    - untested
        - contact me if you have an error with it

### DELETE /db/groups/:group/:message/delete
    - Removes the specified message
    - untested
        - contact me if you have an error with it

## Reactions

### GET /db/groups/:group/:message/react/:user
    - returns the reaction that this user made
        - null if absent
    - untested
        - contact me if you have an error with it

### PUT /db/groups/:group/:message/react
    - swaps this user's reaction
    - body must be a JSON object with the format:
    {
        icon: (String), //just send the new reaction
        authorId: (Int)
    }
    - untested
        - contact me if you have an error with it

### POST /db/groups/:group/:message/react
    - adds a reaction
    - body must be a JSON object with the format:
    {
        icon: (String),
        authorId: (Int)
    }
    - untested
        - contact me if you have an error with it

### DELETE /db/groups/:group/:message/react
    - deletes a reaction
    - body must be a JSON object with the format:
    {
        authorId: (Int)
    }
    - untested
        - contact me if you have an error with it
