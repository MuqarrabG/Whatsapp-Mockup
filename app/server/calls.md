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

## GET /db/chats || GET /db/groups
    - development only
        - don't leave a call to this in the finished product
    - returns all the group data for every group

## GET /db/chats/:chat || GET /db/groups/:chat
    - authentication to be added
        - calls to this may need to be modified
    - returns the data for a specific group

## GET /db/:userId/chats || GET /db/:userId/groups
    - authentication to be added
        - calls to this may need to be modified
    - returns all the data for every group a specific user is in