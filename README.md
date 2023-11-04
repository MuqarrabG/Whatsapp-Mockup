# Group Project-Blue Orange
# {Messaging Service}

Outline of the Web Application

Main Purpose

The main purpose of the messaging applications is to share messages between users either in a direct or group chat setting. In this way the application will be similar to something like WhatsApp or perhaps more accurately Facebook Messenger as the application will not use phone numbers as an addressing scheme.

Users will have to create and log into their account and this will be the addressing scheme for the messages. Basic user information will have to be provided by the user such as their name and email address.

The messages will be sent instantly over the internet and some feedback will be given to the user such as message delivered and perhaps message read by recipient/s. The users will be able to send images and videos to their friends and family. There will be a limit on the size of the file being sent so as to not lag the application too much. This web application will be available on the large internet browsers such as Apple Safari, Google Chrome, Mozilla Firefox, and Microsoft Edge.

This application could also be developed into a mobile application given time, this would suit the project very nicely as users can travel, use their mobile data to access and send messages/media from their mobile phone.


Target User Audience

The target user audience will be ideally everyone, but most likely would younger users in the 14-20 and 20-30 age bracket. This would mostly be because they are more technology literate and likely to use a service like this as it comes naturally to them. These age brackets are also more likely to have access to the technology they need to utilise the messaging service such as a laptop or desktop computer with their preferred internet browser installed.

However inclusive and clear design will be taken into account so that the application is as accessible as possible. The users will mostly be using the application from their computer as the main project is web application, however there is potential for a mobile application that can be used on-the-go and can be accessed via a mobile application. Responsive design will also be implemented so the user will be able to access the service from their mobile phones internet browser but a dedicated mobile application that integrates with the web application may be developed in the future.


Data Sources

The data will be stored in MongoDB json format database, with a user ID generated when the user creates an account with the service, and this will be stored in a User Table. This will allow the user to message other users and have their message be received by the intended user, and the same will apply in a group chat context. 

When messages are sent they will be stored in a message table, so that previous messages can be viewed even after the application has been closed, not just stored in local data. Having the previous messages load when starting the application should be a main feature of the application. The messages table will also store any media sent between the users for the same reason.


Minimum Viable Product (MVP)

The MVP will be a simplified application, containing only the features necessary for the basic functionality of the web application. The MVP for the messaging application would support numerous users and each user could have a direct message thread with any other user. Groups, message threads that more than 2 users have permission to access, would be included in the MVP but the sending and receiving of videos, images, and audio would not be because that is a complicated feature and the application fulfills it’s purpose statement without it. All data will be stored in a cloud based data store, and permissions managing and authentication will be used to determine which users are allowed to request a particular thread in order to read it or to post messages to it. To have multiple user accounts the MVP will need to have authentication and password recovery features. The MVP will not include a mobile app, the web service would be accessible from a mobile device but there would not be a dedicated mobile app that communicates with the same server as the web service. This feature will be omitted for complexity’s sake. Notifications will also be omitted as they are a sub feature of the mobile app variant which does not fit within the MVP.

Milestones

## Milestone 1 (Week 9)
    * Structure of database and dummy json server has been created.
    * 10 user stories and react application has been created.
    * Login and SignUp page of the App has been implemented along with the layout and flow of the landing page.
    * Visual asthetics, logo and theme of the App has been created.

## Milestone 2 (Week 10)
    * Homepage of the app is set-up based on Figma design
    * Backend server is created by using Express to replace the dummy version from milestone.
    * A new repository is created to work on backend development and investigate use of web sockets.
    * Create and design Setting Page along with commented on codes.

## Milestone 3 (Week 11)
    * MongoDB is connected to backend, schema for chats, messages, user being created and auto-scroll issue being fixed.
    * Calls for Backend to responce being written and json data file is able to store messages time now.
    * Backend functionality for current active user, user typing status being created.
    * Setting page side bar and buttons being implemented.

## Milestone 4 (Week 12)
    * Merge Socket.IO and Express Server
    * Given the App a name and Logo
    * Main functionality of the App and messaging services is created and works.

Team members contributions, roles and interaction methods

The main application used for communicate is Discord, where every member discuss the progression of the project, weekly task, and general discussions. Team members also meet up before class each week to have a short discussions on what have been done, plans for the next week and challenges faced. In conclusions, Blue-Orange communicates through Discord whenever it is needed and face to face weekly. 

Each team member in Blue-Orange contributed in different ways and it will be shown below:

Andrew (Role: Back-end, Team Leader & admin task)
-	Ensure Express works as back-end server
-	Comment on codes
-	Delegate task to team members
-	Assist team members on merging individual and main GitHub Branches
-	Update GitHub by completing Deployment.md and putting in Screenshots  

Muqarrab (Role: Front-end and Back-end app developer)
-	Front-end app functions such as onClick buttons
-	Front-end Home Page, Sign-in Page functions
-	Assist Andrew and Ben on backend server
-	Comment on codes
-	Implement MongoDB in the app and connect to back-end server

Ben (Role: Back-end developer, Web Sockets.IO developer & Sprint report manager)
-	Ensure Sockets.IO works on the app 
-	Back-end functionality of app such as user typing status and messages situation between app
-	Created and supervise each team members weekly sprint reports 
-	Comment on codes 

Henry (Role: Web design, Front-end developer, admin task)
-	Design messaging app layout 
-	Comment on codes
-	Front-end Setting page layout and functions
-	App layouts and designs 
-	App Theme and Logo 
-	Update README.md file on GitHub
-	Cross-check descriptions of projects on GitHub and ensure everything is up-to-dates

Main Components

Threads

Threads is an overarching component which will store an array of message components. It will be utilised in both group chat and private 1 on 1 chat feature.Thead will be a subscriber based component. When a user wants to start a conversation with another user using search, the backend system will automatically create a new thread and subscribe the both users onto it, this will allow users to exchange messages. A Thread with more than 2 members will morph into a new Thread with extended properties to support group chat, it will be called Group Chat in the app.

Properties 1-1:

- Messages
- Subscribed Users (inherits from)

Properties 1 to Many:

- Subscribed Users
- Messages
- Name/Title
- Admin ( can be one to many)


Message

Message will be a component that will store the different communication mediums. These mediums are text, images, audio, gifs but for our MVP we will only implement text. Message is also a subscriber based component, when a user sends a message all the subscribed users of the overarching thread component including the user will be automatically subscribed to the message.


Properties:
- Subscribed Users (Inherits from Thread)

Communication Mediums:

- Text
- Images
- GIFs
- Audio Recording
- Files
