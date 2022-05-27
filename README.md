## Overview and Purpose.
The Bus App is a web application that allows admins in charge of bus communication to post information regarding the status of buses for pickup after school. Students can access this information from their phone remotely. The purpose of the app is to make communication easier which makes it easier for admins, makes students less likely to miss their bus or bus changes and allows students to do things after school without fear of missing their bus. 

## Intended Experience
To access the Bus App, all users should enter the website url (https://busapp.nnhsse.org/) into a browser. For convenience, it is recommended that users save this website to their phone’s homepage. 

The below are the intended experiences for both admins and students:

#### Admin Experience
From the homepage, admins should click the “Login as editor” button in the top right and complete authentication via google on the login page. If they are on the whitelist, they will be redirected to the admin page.

From this page admins are able to edit bus changes, status (NOT HERE, HERE, LOADING or GONE) and time. Time will update automatically when status is changed. Additionally, they can add or remove buses.

Administrator Handbook: https://docs.google.com/document/d/1MaySGjV3I7LIaNLHDQCaPODoN7ZUI3aYht6oijkWy_4/edit?usp=sharing

#### Student Experience 
On the home page, students have access to all the information they need. The page consists of  a bus table displaying Bus Number, Bus Change, Status and Time. Additionally, a panel displaying the weather is visible in the top right. 

Students should first check for a bus change when opening the app and then periodically check the status of their bus to make sure they catch it. Information updated by admins is live so students will not have to refresh to view new information.

Informational video for students: https://drive.google.com/file/d/1GNePsvjmeqIkuCKzadV3rCa1L38vnhKd/view?usp=sharing

## Project Setup
Follow these steps to setup the Bus App project
1. Install node on your computer. Node download page: https://nodejs.org/en/download/. The current build is running on Node v17.4.0 (run `node --version` to verify). Functionality is unknown on other versions. Make sure you also have git on your computer.
2. Clone the git repository onto your computer using `git clone https://github.com/nnhsse202122/BusApp-SE2122.git`
3. Run `npm install` to install all dependencies

## Running the Bus App

#### On Local Host
To run the Bus App on local host, run `npm run buildStart` using a terminal currently in the home directory of the project. This compiles the typescript and starts the server. After you see the message `Server is running on port 5182` you’ve started the server successfully. Now go to `http://localhost:5182/` to start development.

#### On Production
/// Mr. Schmit write here

## Working with the Bus App

#### Overview of Web Applications
The Bus App is a web application built using Node. Specifically, the key dependency to managing a server is Express. Like all projects working with Express should, the entire project is started from the file `server.ts` (note the .ts file extension. This is because the project uses Typescript which will be covered later). In this file, all the setup for the project happens:
1. Setting the port number
2. Setting up Socket.io
3. Setting up Express to render the ejs file type and defining path shortcuts for assets
4. Linking all the routes (this is very important)
5. Starting some code that needs to be run periodically on a timer
6. Finally starting the server

A server is something that is always listening, and (with the exception of code run periodically) only runs code when a client makes a request to the server. The most common type of request (and only type used in the Bus App Project) is a get request. This is used for requesting the html (in our case ejs) required to display a page and occurs every time a url is typed into a search bar.

#### Technologies
The Bus App uses a variety of technologies. Below is some information on how to get started with them:

##### Express
As mentioned above, Express is the key technology we use to run a server. Please check the official documentation: https://expressjs.com/

##### Typescript
Read this document to get started with Typescript. Keep in mind that if you have followed the setup instructions you already have installed Typescript in your project and do not need to do it again.

Typescript Setup: https://docs.google.com/document/d/1Nz-GhLjmN0Ouh1HqJKd14x_Rf_aChft_tl6PNyOLsHA/edit?usp=sharing

Typescript Crash Course: https://docs.google.com/document/d/1KSmqDuMzLxKAVosLv3uDOzb63P3wa08IcdHxCy8rYwo/edit?usp=sharing

##### Ejs
Ejs is a form of html that allows javascript to be run during the creation of the html. This allows for tables to be created much more easily. Please see the official documentation: https://ejs.co/

##### Socket.io
Socket.io allows us to send data to and from the server in live time using `emit()` and `on()`. This is important because it allows us to update a page without it being refreshed which is key to the functionality of the Bus App. Please see the official documentation: https://socket.io/

#### Review Checklist
To reduce errors on the main branch, we developed a review checklist that MUST be completed before pull requests into the main branch. This list should be updated as new features are added that need to be reviewed.

Bus App Review Checklist: https://docs.google.com/document/d/1LyFzvAMvRl7MwXduhM87Do7hioelJ-QnWEe4GnpKBU4/edit?usp=sharing
