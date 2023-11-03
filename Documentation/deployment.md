# Deployment
This application is deployed on the Render web service free tier.
It is registered as a web service in the Singapore (Southeast Asia) region.
The service is called Hi Five - Limited as per the long name of the Application in the manifest.json file in the repository.
The service is deployed from the main branch of the repository and the ./app/ directory.
The build command is: $ npm install && npm run build
The start command is: $ npm run server

# Access
The app is deployed under this URL:
    - https://hi-five-limited.onrender.com
Because the app is using the free tier, it may take a few minutes to start up again if no one has used it for half an hour.
To use the app you can sign up for free, or there are 4 example user accounts listed in the ./users.md file.

# Notes
When we were running this application on our LAN networks, we were all able to get it to work perectly.
However, for a while, when it was hosted on Render we could not get it to save mesages between reloads of the page.
We were able to fix this bug but I wrote these notes in case we could not fix it:
"
To see this feature working:
    - run 3 teminals on your lan network
    - run 'cd app' on all of them
    - find your device's LAN IP address
    - replace "hi-five-limited.onrender.com" with "__yourIPaddress__:3001" in /server/Websocket.js
    - replace "hi-five-limited.onrender.com" with "__yourIPaddress__:3001" in /src/services/api.js
    - run 'npm install' on one terminal and wait for it to finish
    - run 'npm run dev' on another terminal
    - run 'npm run socket' on the last terminal
    - run 'npm start' on the first terminal and the app should work in it's entireity.
"