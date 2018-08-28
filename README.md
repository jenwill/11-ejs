Lab 11: Server-side templating with EJS

## Submission Instructions

- Complete your Feature Tasks for the day (below)
- Create a Pull Request (PR) back to the `master` branch of your repository
- On Canvas, submit a link to your PR and a link to your deployed application on Heroku. **Make sure to include the following:**
  - A question within the context of today's lab assignment
  - An observation about the lab assignment, or related 'Ah-hah!' moment
  - How long you spent working on this assignment

## Resources

- [EJS for server-side templating](http://ejs.co/)
- [ExpressJS docs - app.set](https://expressjs.com/en/4x/api.html#app.set)
- [Heroku Postgres Docs](https://devcenter.heroku.com/articles/heroku-postgresql)

- [Book app wireframes](./wireframes)

## Configuration

_Your repository must include the following config files:_

- `.env` - with your PORT and DATABASE_URL. Make sure this file is included in your `.gitignore`
- `README.md` - with documentation regarding your lab and it's current state of development. Check the "documentation" section below for more details on how that should look **AT MINIMUM**
- `.gitignore` - with standard NodeJS configurations
- `.eslintrc.json` - with Code 301 course standards for the linter
- `package.json` - with all dependencies and any associated details related to configuration
- Note that the `package-lock.json` file is automatically created when dependencies are installed and ensures that future installations of the project use the same versions of the dependencies.

```sh
book_app (repository)
├──public
│  └── styles
│      ├── base.css
│      ├── fonts
│      │   ├── icomoon.eot
│      │   ├── icomoon.svg
│      │   ├── icomoon.ttf
│      │   └── icomoon.woff
│      ├── icons.css
│      ├── layout.css
│      ├── modules.css
│      └── reset.css
├──views
│  ├── pages
│  │   └── error.ejs
│  └── index.ejs
├── .env
├── .eslintrc.json
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## User Stories and Feature Tasks

### Overview

This week, you and your partner(s) will implement a basic full stack application for a book list which will render books from a PostgreSQL database. Today's portion of the application involves storing book objects in a database. The client can make a request to the server for retrieval of all books, which will then be rendered as a list in the browser.

Your entire application will be deployed on Heroku with a PostgreSQL database provisioned.

### Repository Set-up

- Create a new repository on GitHub named `book_app`. Add your partner(s) as collaborator(s). Clone this repository into your `codefellows/301` directory. You will be working in this same repository for labs 11 through 14.

### Heroku deployoment

- One person from your group should create an instance on Heroku. Refer to lecture 5 for a reminder on the steps, if needed. You will be working in this same instance for labs 11 thorugh 14.
  - Follow the naming convention of `<partner 1 initials>-<partner 2 initials>-booklist`. For example, Allie and Sam's instance would be named `https://ag-sh-booklist.herokuapp.com` 
- Provision a PostgreSQL database.
- In the Deploy tab, connect your instance to your repository and enable automatic deploys from your master branch. Deploy your application and make sure there are no errors.
- From this point on, work on semantically-named non-master branches. Once your app is functioning correctly on your branch, make a PR to master and confirm functionality on your deployed site. Your deployed site **should not** contain any broken functionality.

### Database configuration

- Within your PostgreSQL shell, create a new database named `books_app`.
- Create a new table in your database called `books`.
  - Create a schema for your `books` table. This schema should contain the following properties:
    - `id` as the primary key
    - `author`
    - `title`
    - `isbn`
    - `image_url`
    - `description`
- Use Postman to request book data from the Google Books API. For example, you can enter a search query at the end of this route: `https://www.googleapis.com/books/v1/volumes?q=`
- Manually enter each record into your `books` table. Your collection should have at least five unique books.
- For reference, here is a sample:
```
  {
    "title": "Dune",
    "author": "Frank Herbert",
    "isbn": "ISBN_13 9780441013593",
    "image_url": "http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    "description": "Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny."
  }
```
- Migrate your local database to Heroku, using the following format for your command: `heroku pg:push books_app DATABASE_URL --app <partner 1 initials>-<partner 2 initials>-booklist`
  - _Note: Unless the local database is pushed to Heroku again, any changes to the local database will not be reflected in the production database._

### Feature 1: Server-side rendering

#### Why are we implementing this feature?

- As a user, I want to my application to load quickly so that I have an enjoyable experience.

#### What are we going to implement?

Given that a user open the application in the browser  
When the user navigates to the home page  
Then the index should load without a flash of unstyled content (FOUC)  

#### How are we implementing it?

- Create a basic `server.js` file. Make sure your server is listening for connections on a `PORT`. Remember to set the view engine and serve your static CSS files.
- Install any necessary NPM packages and ensure that they are documented as dependencies in your `package.json`.
- For server-side rendering, EJS looks for a folder called `views`. Create a `views` folder. Within this folder, create a file called `index.ejs`. 
  - Note: with server-side rendering, `index.ejs` is analogous to the typical `index.html` file that you are used to, but will also allow EJS syntax for templating.
- Create a basic HTML scaffold in your `index.ejs` file which contains several elements that you can view in the browser, such as a heading element that says "Hello World". Also create a basic CSS file with several rules, such as an obvious background color. These will serve as our "proof of life" that the files are connected as expected, both locally and when deployed.
- For testing purposes, include a temporary route such as `app.get('/hello')` and render your `index.ejs` file. Turn on your server and validate that the HTML elements and basic CSS styles are being rendered as expected. This route will be useful in the future if you ever need to test your application without relying on data from a database.

### Feature 2: Show all books when the application loads

#### Why are we implementing this feature?

- As a user, I want all of my books to be displayed on the home page so that I can view all of the books from my collection in a single view.

#### What are we going to implement?

Given that a user open the application in the browser  
When the user navigates to the home page  
Then all of the books in the collection should be rendered on the page  

#### How are we implementing it?

- Create a new endpoint at `GET /books` which will retrieve an array of book objects from the database, limited to only the `title`, `author`, and `image_url`. Include the results as data when rendering the index page.
- Build out your `index.ejs` file to display all of the books on the page. Follow correct EJS syntax to iterate over an array of book objects and render each one in a similar manner.
  - Display the title and author of each book.
  - Display a picture of the book cover.
- Include a count of the total number of books that are in the database.
- Test locally to verify that the books are displayed as expected. Redeploy your application and verify that the books are displayed as expected.

### Feature 3: Error handling

#### Why are we implementing this feature?

- As a user, I want to view any error messages that occur during the usage of my book list application so that I know if something has gone wrong.

#### What are we going to implement?

Given that the application is not functioning properly  
When an error occurs  
Then the user should receive feedback that something has gone wrong  

#### How are we implementing it?

- Create an error view and render this view any time an error occurs.

### Feature 4: Style the book application

#### Why are we implementing this feature?

- As a user, I want a simple, clean looking UI so that my application is easy to navigate.

#### What are we going to implement?

Given that users access the application on multiple platforms  
When the user views the application  
Then the interface should be intuitive and visually pleasing  

#### How are we implementing it?

- Style your site using a mobile-first approach. Make sure your site is responsive. Use the provided wireframes as a general guideline for the minimum styling requirements, while adding your own personal taste and color palette.
- Ensure the proper use of SMACCS principles. You and your partner(s) may choose to use float-based layout, grid-based layout, Flexbox, or a combination of these.
- You will need to include icon fonts from a source such as Icomoon or FontAwesome for the social media icons you choose to include in the application.
- Redeploy your application.

## Stretch Goal

*As a developer, I want to automatically populate the database so my application is functioning efficiently.*

- Implement a NodeJS script that will read a JSON file and populate your PostgreSQL database with that content.
  - You will need to utilize the `fs` (file system) [module from Node](https://nodejs.org/api/fs.html).

## Documentation

_Your `README.md` must include:_

```md
# Project Name

**Author**: Your Name Goes Here
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for a Code Fellows 301 class. (i.e. What's your problem domain?) -->

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with GET and POST routes for the book resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. --
-->
```
