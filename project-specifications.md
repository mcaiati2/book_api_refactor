# 18 MERN: Book Search Engine

## Your Task

Your assignment this week is emblematic of the fact that most modern websites are driven by two things: data and user demands. This shouldn't come as a surprise, as the ability to personalize user data is the cornerstone of real-world web development today. And as user demands evolve, applications need to be more performant.

This week, you’ll take starter code with a fully functioning Google Books API search engine built with a RESTful API, and refactor it to be a GraphQL API built with Apollo Server. The app was built using the MERN stack with a React front end, MongoDB database, and Node.js/Express.js server and API. It's already set up to allow users to save book searches to the back end.

To complete the assignment, you’ll need to do the following:

1. Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.

2. Modify the existing authentication middleware so that it works in the context of a GraphQL API.

3. Create an Apollo Client Provider so that requests can communicate with an Apollo Server.

4. Deploy your application to Render with a MongoDB database using MongoDB Atlas. Use the [Deploy with Render and MongoDB Atlas](https://coding-boot-camp.github.io/full-stack/mongodb/deploy-with-render-and-mongodb-atlas) walkthrough for instructions.

## User Story

```md
AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase
```

## Acceptance Criteria

```md
GIVEN a book search engine
WHEN I load the search engine
THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button
WHEN I click on the Search for Books menu option
THEN I am presented with an input field to search for books and a submit button
WHEN I am not logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site
WHEN I click on the Login/Signup menu option
THEN a modal appears on the screen with a toggle between the option to log in or sign up
WHEN the toggle is set to Signup
THEN I am presented with three inputs for a username, an email address, and a password, and a signup button
WHEN the toggle is set to Login
THEN I am presented with two inputs for an email address and a password and login button
WHEN I enter a valid email address and create a password and click on the signup button
THEN my user account is created and I am logged in to the site
WHEN I enter my account’s email address and password and click on the login button
THEN the modal closes and I am logged in to the site
WHEN I am logged in to the site
THEN the menu options change to Search for Books, an option to see my saved books, and Logout
WHEN I am logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account
WHEN I click on the Save button on a book
THEN that book’s information is saved to my account
WHEN I click on the option to see my saved books
THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account
WHEN I click on the Remove button on a book
THEN that book is deleted from my saved books list
WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button  
```

## Mock-Up

Let's start by revisiting the web application's appearance and functionality.

As you can see in the following animation, a user can type a search term (in this case, "star wars") in a search box and the results appear:

![Animation shows "star wars" typed into a search box and books about Star Wars appearing as results.](./Assets/18-mern-homework-demo-01.gif)

The user can save books by clicking "Save This Book!" under each search result, as shown in the following animation:

![Animation shows user clicking "Save This Book!" button to save books that appear in search results. The button label changes to "Book Already Saved" after it is clicked and the book is saved.](./Assets/18-mern-homework-demo-02.gif)

A user can view their saved books on a separate page, as shown in the following animation:

![The Viewing Lernantino's Books page shows the books that the user Lernaninto has saved.](./Assets/18-mern-homework-demo-03.gif)

## Getting Started

In order for this application to use a GraphQL API, you’ll need to refactor the API to use GraphQL on the back end and add some functionality to the front end. The following sections contain details about the files you’ll need to modify on the back and front end.

**Important**: Make sure to study the application before building upon it. Better yet, start by making a copy of it. It's already a working application&mdash;you're converting it from RESTful API practices to a GraphQL API.

### Back-End Specifications (server folder)

You’ll need to refactor and add the following functionality to the back-end (Use the in-class example code for a reference):

* `src/services/auth.ts`: Change the blockGuest function to be an expressMiddleware context function. You can rename it to `authenticate` and refactor the code to return an object with the user_id attached. Use the getUserId function to pull the user_id from the cookie JWT. You do NOT need to refactor the getUserId function.

* `src/services/server.ts`: Create an Apollo Server and use the expressMiddleware function from the Apollo package along with app.use() to connect the Express app to the Apollo server.

* Create a `schemas` directory within `src` and add the following files:

  * `resolvers.ts`: Export an object with sub Query and Mutation objects within it.  Convert the functions in `src/controllers/user_controllers.ts` and `src/controllers/auth_controllers.ts` to resolvers within the respective Query and Mutation objects.

      - **Hint**: Read through the functions in the controller files thoroughly before moving the functionality code over.

      - **Bonus**: Create a nested `resolvers` folder within `schemas` and make an `auth_resolvers.ts` and `user_resolvers.ts` file to seperate the resolver functionality. You will then need to import them into `resolvers.ts` and spread the Query and Mutation objects into their respective properties. (Refer to our example in-class application for help)

  * `typeDefs.ts`: Define the necessary types in a `gql` template literal string:

    * `Book` type:

      * `googleBookId` (This is NOT the `_id`, but the book's `id` value returned from Google's Book API.)

      * `authors` (An array of strings, as there may be more than one author.)

      * `description`

      * `title`

      * `image`

      * `link`


    * `User` type:

      * `_id` (Make sure to use the ID value type)

      * `username`

      * `email`

      * `bookCount` (Int type that provides the number of books the user has saved)

      * `savedBooks` (This will be an array of the `Book` type.)


    * `Response` type (This will represent the general response object many of your resolvers will return):

      * `user` (References the `User` type.)
      * `message` (String)
    
    * `Query` type (These are your Query resolvers):

      * `getUser`: Returns a `Response` type.
      * `getUserBooks`: Returns an array of `Book` type.
  
    * `Mutation` type (These are your Mutation resolvers):

      * `registerUser`: Accepts a username, email and password as arguments; returns a `Response` type.

      * `loginUser`: Accepts an email and password as arguments; returns a `Response` type.

      * `logoutUser`: returns a `Response` type.

      * `saveBook`: Accepts a googleBookId, author's array, title, description, and image as arguments; returns a `Response` type. (Look into creating what's known as an `input` type to handle all of these parameters!)

      * `deleteBook`: Accepts a book's `googleBookId` as an argument; returns a `Response` type.

### Front-End Specifications (client folder)

You'll need to add the following front-end functionality (Use the in-class example code for a reference):

* Create a `src/grapql/queries.tsx` file and then create and export the following `gql` string variables (You can use the Apollo Sandbox to get the GraphGL code):
  - `GET_USER`: Will execute the `getUser` query resolver.
  - `GET_USER_BOOKS`: Will execute the `getUserBooks` query resolver.

* Create a `src/grapql/mutations.tsx` file and then create and export the following `gql` string variables (You can use the Apollo Sandbox to get the GraphGL code):
  - `LOGIN_USER`: Will execute the `loginUser` mutation resolver.
  - `REGISTER_USER`: Will execute the `registerUser` mutation resolver.
  - `LOGOUT_USER`: Will execute the `logoutUser` mutation resolver.
  - `SAVE_BOOK`: Will execute the `saveBook` mutation resolver.
  - `DELETE_BOOK`: Will execute the `deleteBook` mutation resolver.

Additionally, you’ll need to complete the following tasks in each of these front-end files:

  * `src/main.tsx`: 
    - Implement the @apollo/client functionality by creating an Apollo Client variable and then wrap the <RouterProvider> tag in the <ApolloProvider> tag. Make sure to add the `client` prop with the value of the client variable to the ApolloProvider tag.

  * `src/store/index.tsx`: 
    - Use the @apollo/client `useQuery` hook to execute the `GET_USER` query (from `src/graphql/queries.tsx`). Within the `useEffect` function, you'll need to check if the query `data` is truthy and then call `setState`.Replace `user: res.date.user` with `user: data.getUser.user` Make sure to add `data` to the `useEffect` array.

  * `src/components/NavBar.tsx`:
    - Use the @apollo/client `useMutation` hook to execute the `LOGOUT_USER` mutation(from `src/graphql/mutations.tsx`) within the `handleLogout` function.
    - You'll need to replace the `await logoutUser()` line of code and remove the `logoutUser` import from the top of the file.

  * `src/components/AuthForm.tsx`:
    - Use the @apollo/client `useMutation` hook to execute either the `REGISTER_USER` or the `LOGIN_USER` mutation(from `src/graphql/mutations.tsx`) within the `handleFormSubmit` function, based on the `isLogin` prop that is passed.
    - You'll need to replace the `const res = await authFunction(formData)` line of code and remove the `import { loginUser, registerUser } from '../utils/API'` line from the top of the file.
    - The `authFunction` variable can be updated to call the mutation resolver function corresponding with the `isLogin` prop.

  * `src/pages/SearchBooks.tsx`:
    - Use the @apollo/client `useQuery` hook to execute the `GET_USER_BOOKS` query (from `src/graphql/queries.tsx`). Within the `useEffect` function, you'll need to check if the query `data` is truthy and then call `setUserBooks` and pass in the `data.getUserBooks` array value. Make sure to add `data` to the `useEffect` array.
    - Use the @apollo/client `useMutation` hook to execute the `SAVE_BOOK` mutation(from `src/graphql/mutations.tsx`) within the `handleSaveBook` function.
    - You'll need to replace the `await saveBook(book)` line of code.
    - Also, make sure to remove the `import { getUserBooks, saveBook, searchGoogleBooks } from '../utils/API'` from the top of the file.

  * `src/pages/SavedBooks.tsx`:
    - Use the @apollo/client `useQuery` hook to execute the `GET_USER_BOOKS` query (from `src/graphql/queries.tsx`). Within the `useEffect` function, you'll need to check if the query `data` is truthy and then call `setUserBooks` and pass in the `data.getUserBooks` array value. Make sure to add `data` to the `useEffect` array.
    - Use the @apollo/client `useMutation` hook to execute the `DELETE_BOOK` mutation(from `src/graphql/mutations.tsx`) within the `handleDeleteBook` function.
    - You'll need to replace the `await deleteBook(bookId)` line of code.
    - Also, make sure to remove the `import { getUserBooks, deleteBook } from '../utils/API'` from the top of the file.

Once you have completed the file updates, delete every function out of the `src/utils/API.ts` file except `searchGoogleBooks`, which is still needed for the search feature.

### Deployment Tips
- Run the `deploy` script before setting up your Render app, so your Github repo is up to date.
- Set the build script on your Render app to `npm run render:install`.
- Set the start script on the your Render app to `npm start`.

## Grading Requirements

> **Note:** If a Challenge assignment submission is marked as “0”, it is considered incomplete and will not count toward your graduation requirements. Examples of incomplete submissions include the following:
>
> * A repository that has no code
>
> * A repository that includes a unique name but nothing else
>
> * A repository that includes only a README file but nothing else
>
> * A repository that only includes starter code

This Challenge is graded based on the following criteria:

### Technical Acceptance Criteria: 40%

* Satisfies all of the preceding acceptance criteria plus the following:

  * Has an Apollo Server that uses GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.

  * Use an Apollo Server and apply it to the Express.js server as middleware.

  * Include schema settings for resolvers and typeDefs as outlined in the Challenge instructions.

  * Modify the existing authentication middleware to work in the context of a GraphQL API.

  * Use an Apollo Provider so that the application can communicate with the Apollo Server.

  * Application must be deployed to Render.

### Deployment: 32%

* Application deployed at live URL.

* Application loads with no errors.

* Application GitHub URL submitted.

* GitHub repository contains application code.

### Application Quality: 15%

* User experience is intuitive and easy to navigate.

* User interface style is clean and polished.

* Application resembles the mock-up functionality provided in the Challenge instructions.

### Repository Quality: 13%

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains high-quality README file with description, screenshot, and link to the deployed application.

## Review

You are required to submit BOTH of the following for review:

* The URL of the functional, deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

---
© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
