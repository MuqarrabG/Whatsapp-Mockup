# Valid backend calls:

## GET /db/
    - development only
        - don't leave a call to this in the finished product
    - returns all the json data

## GET /db/users
    - development only
        - don't leave a call to this in the finished product
    - returns all the user data for every user

## GET /db/users/:userId
    - authentication to be added
        - calls to this may need to be modified
    - returns the data for a specific user

## GET /db/groups
    - development only
        - don't leave a call to this in the finished product
    - returns all the group data for every group

## GET /db/groups/:chat
    - authentication to be added
        - calls to this may need to be modified
    - returns the data for a specific group

## GET /db/:userId/groups
    - authentication to be added
        - calls to this may need to be modified
    - returns all the data for every group a specific user is in

## POST /db/users
    - adds a new user to the list of users
    - body must be a JSON object with the format:
    {
        username: (String),
        password: (String)
    }

## POST /db/groups
    - adds a new group to the list of groups
    - body must be a JSON object with the format:
    {
        founderId: (Int),
        founderName: (String)
    }
    - untested
        - contact me if you have an error with it

## POST /db/groups/:groupId/invite
    - adds a new member to a specific group
    - body must be a JSON object with the format:
    {
        memberId: (Int),
        memberName: (String)
    }
    - untested
        - contact me if you have an error with it

## POST /db/groups/:groupId/post
    - adds a new member to a specific group
    - body must be a JSON object with the format:
    {
        content: (String),
        authorId: (Int)
    }
    - untested
        - contact me if you have an error with it

## POST /db/groups/:groupId/:messageId/react
    - adds a new member to a specific group
    - body must be a JSON object with the format:
    {
        icon: (String),
        authorId: (Int)
    }
    - incomplete
        - will talk about the extent of this feature soon
    - untested
        - contact me if you have an error with it