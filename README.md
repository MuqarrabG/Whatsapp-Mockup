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

