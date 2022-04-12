## Overview
This is a web application that allows teachers in charge of bus commumincation to post information regarding that stauts of buses that can be accessed online and therefore from a students phone.

## Features

#### Student Experience
Students will be able to enter the website url into a broswer in order to access. The home pages displays a simple table with bus number, change, arrival time and status. Additionally a message about the weather is displayed below. Information updated by admins is live so students will not have to refresh to view new information.

#### Admin Experience
People that are on the whitelist have access to the admin page which allows them to edit bus information. To reach this page, go to the same page students view (by entering the url) and select "Login to edit buses". This will redirect them to a page where they can login with google and if their email address is on the whitelist, they will be given access to the admin page. 

On this page, teachers are able to add and remove buses, edit bus number, change, arrival time and status, and enter a message to describe the current weather in the bus lot. Edited information will not be visable to students and other teachers until the save button is pressed and if multiple teacher are editing at the same time changes by other teachers will not be visable until the page is refreshed (We plan on making this more convinenet).

If a user tries to access the admin page directly, this will be redirected to the login page and if they login to an account not on the whitelist, they will be redirected to an unauthorized page.

## Project Setup
To get started, clone this repo onto your computer. Then run the command `npm i` to install dependencies. To run the server on localhost run the command `npm run buildStart` this will complie the typescript and start the server on port `localhost:5182`.

## Project Overview
This project is written using a combination of javascript, typescript, ejs, yaml and css. To get an understand of typescript read these documents [ts setup](https://docs.google.com/document/d/1Nz-GhLjmN0Ouh1HqJKd14x_Rf_aChft_tl6PNyOLsHA/edit?usp=sharing), [ts crash course](https://docs.google.com/document/d/1KSmqDuMzLxKAVosLv3uDOzb63P3wa08IcdHxCy8rYwo/edit?usp=sharing). This application is a web server using express and typescript. The start point for the project is `server.ts`. Lots of things are done in this file but the most important is creating a new express app (`const app: Application = express();` and running it on the localhost (`httpServer.listen(PORT, () => {console.log(`Server is running on port ${PORT}\`)});`)

