# What Was The Plan For Sprint 3?

1. Begin using websockets to send and receive messages.
2. Continue working on the express server:

- PUT and DELETE requests
- Expand reactions call to handle PUT, POST, DELETE, and GET for when a user may add or change a reaction.
- We had planned to integrate MongoDB but this may have to be pushed to Sprint 4

3. Front end should make calls to the axios server rather than hard coded into the front end.
4. A few visual changes we wish to change to the front end such as:

- Autoscroll to the bottom of the page (to show the latest message) cutting off the input field for a new message

# What Work Actually Happened

## {Muqarrab's} Progress

    - Fix the autoscroll issue
    - Connect MongoDB to backend
    - Created Schema for Chats, Messages, and User
    - Researched user auhenication

## {Andrew's} Progress

    - Finished writing all the calls that the backend will need to respond to
    - Modified existing calls and jason data file to store the time of messages
    - Assisted all team members in merging their branches to main.

## {Ben's} Progress

    - Created a sample messaging app to better understand the operation of Socket.io.
        - Began gathering the current user, and sending messages to the console via the Socket.io server.
    - Added backend functionality for:
        - Currently active users
        - Notified when a user is currently typing (typing status)
    - Organised sprint report 3

## {Henry's} Progress

    - Investigated on setting page layout.
    - Implemented side bar and buttons.

## Milestone
    * MongoDB is connected to backend, schema for chats, messages, user being created and auto-scroll issue being fixed.
    * Calls for Backend to responce being written and json data file is able to store messages time now.
    * Backend functionality for current active user, user typing status being created.
    * Setting page side bar and buttons being implemented.

## Plan for Sprint 4

    - Merge Socket.io, express, and Mongo DB
    - Finalise the front end
    - Comment code
