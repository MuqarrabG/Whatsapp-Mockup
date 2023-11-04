# What Was The Plan For Sprint 2?

    1. Convert dummy server into express run server
    2. Begin developing the HTML and CSS of the following pages:
        - Inbox/Home screen
        - Send message screen
        - Setting home screen
        * this will all be done in reference to our designs created using Figma from Sprint 1
    3. Introduce the router to the project, to route between the pages of the app.
    4. Introduce Socket.IO to the project for instant communication aspect of the project.

# What Work Actually Happened

## {Muqarrab's} Progress

- Used HTML & CSS to create the look of the home page of the web app in accordance with the figma designs.
  - This is a list of the components that make up the home page.
    - **Home Page**
      - **Sidebar**
        - **Topbar**
        - **Search Bar**
        - **Chat List**
      - **Messaging Panel**
        - **Header**
        - **Chat Messages**
        - **Message Input**
- some challenges were:
  - having the components always return a value (for example, a loading screen if the content was not ready yet.)
  - having a default value when the data is lacking (for example, a default profile picture if the user hasn't se one yet.)

-\* 2, 3

## {Andrew's} Progress

- Used express to begin making a proper backend server in place of the dummy one that we had from sprint 1
  - this is not finished, Put and Delete requests still need to be handled and the add reaction call needs discussion.
- Added a calls.md file to the server folder so that the frontend developers can use the backend I have made easily.

-\* 1

## {Ben's} Progress

- Created a seperate repository for the pourposes of investigating the use of web sockets.
- Shared that new repository with **%Andrew%** and **%Muqarrab%** to help with backend development.
  - This repo mains purpose is to investigate the use of Socket.IO for messaging service.
- Organised Sprint Report 2.

- Some challenges were:
  - Understanding how websockets work
  - Implementing websocket examples from my research to the needs of our application.

-\* 4

## {Henry's} Progress

-  Create / design setting page
-  Comment on codes.
-  ** 2
  
-  Challenges:
    - Understand how Tailwind CSS work to design Layout of page


## Milestone
    * Homepage of the app is set-up based on Figma design
    * Backend server is created by using Express to replace the dummy version from milestone.
    * A new repository is created to work on backend development and investigate use of web sockets.
    * Create and design Setting Page along with commented on codes.


## Plan for Sprint 3

- Begin using websockets to send and receive messages.
- Continue working on the express server:
  - PUT and DELETE requests
  - Expand reactions call to handle PUT, POST, DELETE, and GET for when a user may add or change a reaction.
  - We had planned to integrate MongoDB but this may have to be pushed to Sprint 4
- Front end should make calls to the axios server rather than hard coded into the front end.
- A few visual changes we wish to change to the front end such as:
  - Autoscroll to the bottom of the page (to show the latest message) cutting off the input field for a new message
