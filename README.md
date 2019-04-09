## Description

_Would You Rather: Ask questions and share your opinions with the world!_ is a React-Redux web application that allows users to create and respond two-answer polls.

It is also the final project from Udacity's React & Redux course.

### Launching the application

Just run `npm i` && `npm start` inside the project's folder

## Features

This project implements all the features described at the _Would You Rather_ project specifications page

## Extra Features

I've added some extra content to make my project stand out, such as

- A messaging system using a [messages reducer](/src/reducers/messages.js)
- A connected-router to dispatch route changes
- A Loading System
- Local Storage to preserve the authed user's session across page reloads _*removed to meet project specification*_
- The [protect HOC](/src/hocs/protect.js) to prevent unidentified users from accessing protected components
