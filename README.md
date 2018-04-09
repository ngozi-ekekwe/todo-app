#TODO-APP


The simple sms sender  allows you send sms using infobib. It offers an intuitive UI that allows you send message to any number around the world with ease

## Technology
 - Nodejs /Express.js
 - Javascript
 - REACT

## REQUIREMENTS
A user using this app should be able to register and log-in using secure means and:
- Create or Edit entries.
- Have access to a list of already saved TODO’s.
- Be able to mark entries as Done or Undone.
- Hide entries that are Done or marked for deletion and show some distinction - between each when viewing hidden items.
- Should be able to see timestamps of when the entries were
Created
- Day marked for completion.
- A user should also be able to log-out successfully and be greeted with a nicely shown prompt of successful session termination.


## HOW TO RUN
- Just pull the branch and cd into `cd todo-app`
- create a .env file from the .env-example
- fill in your infobib details
```
PORT=3000
DATABASE_STAGING_ENVIRONMENT=""
DATABASE_TEST_ENVIRONMENT=""
DATABASE_URL=""
SECRET=secret
```
- run `npm install`
- run `npm start`