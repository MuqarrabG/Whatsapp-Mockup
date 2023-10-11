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

### GET /db/users/:userId
    - authentication to be added
        - calls to this may need to be modified
    - returns the data for a specific user

### GET /db/:userId/groups
    - authentication to be added
        - calls to this may need to be modified
    - returns all the data for every group a specific user is in

### PUT
    - Change Username
    - to do

### PUT
    - Change password
    - to do

### POST /db/users
    - adds a new user to the list of users
    - body must be a JSON object with the format:
    {
        username: (String),
        password: (String)
    }

### DELETE
    - User
    - to do

## Groups

### GET /db/groups
    - development only
        - don't leave a call to this in the finished product
    - returns all the group data for every group

### GET /db/groups/:group
    - authentication to be added
        - calls to this may need to be modified
    - returns the data for a specific group

### POST /db/groups
    - adds a new group to the list of groups
    - body must be a JSON object with the format:
    {
        founderId: (Int),
        founderName: (String)
    }
    - untested

### DELETE
    - Group
    - to do
     - contact me if you have an error with it

## Members

### PUT
    - change user nickname for a group
    - to do

### POST /db/groups/:groupId/invite
    - adds a new member to a specific group
    - body must be a JSON object with the format:
    {
        memberId: (Int),
        memberName: (String)
    }
    - untested
        - contact me if you have an error with it

### DELETE
    - User from a group
    - to do

## Messages

### GET /db/groups/:group/latest
    - authentication to be added
        - calls to this may need to be modified
    - returns the latest message for a specific group
    - to do

### POST /db/groups/:groupId/post
    - adds a new message to a specific group
    - body must be a JSON object with the format:
    {
        content: (String),
        authorId: (Int)
    }
    - untested
        - contact me if you have an error with it

### PUT
    - Edit messages
    - to do

### DELETE
    - Message
    - to do

## Reactions

### GET /db/groups/:groupId/:messageId/react/:userId
    - returns the reaction that this user made
        - null if absent
    - untested
        - contact me if you have an error with it

### PUT /db/groups/:groupId/:messageId/react
    - swaps this user's reaction
    - body must be a JSON object with the format:
    {
        icon: (String), //just send the new reaction
        authorId: (Int)
    }
    - untested
        - contact me if you have an error with it

### POST /db/groups/:groupId/:messageId/react
    - adds a reaction
    - body must be a JSON object with the format:
    {
        icon: (String),
        authorId: (Int)
    }
    - untested
        - contact me if you have an error with it

### DELETE /db/groups/:groupId/:messageId/react
    - deletes a reaction
    - body must be a JSON object with the format:
    {
        authorId: (Int)
    }
    - untested
        - contact me if you have an error with it
