# Google Books Search Engine

## Description

[Deployed Application Link.](https://graphql-book-refactor-v2.onrender.com)

The Google Books search engine is a full-stack application that gives users to the ability to search for their favorite books and add these books to a personalized list. The application leverages the Google Books API to make this functionality possible. The application is built with a React frontend and an Express/Node.js backend, using GraphQL for API communication and MongoDB for data storage.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/googlebooks-app.git
    cd googlebooks-app
    ```

2. Install dependencies for both the client and server:
    ```sh
    npm run install
    ```

3. Create a `.env` file in the `server` directory and add your MongoDB URI and JWT secret key:
    ```env
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET_KEY=your-jwt-secret-key
    ```

## Usage

1. Build the project:
    ```sh
    npm run build
    ```

2. Start the server:
    ```sh
    npm start
    ```

3. In development mode, you can use the following command to start both the client and server with hot-reloading:
    ```sh
    npm run develop
    ```

4. Open your browser and navigate to `http://localhost:3000` to use the application.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Search Books**: Users can search for books using the Google Books API.
- **Save Books**: Users can save books to their personal list.
- **View Saved Books**: Users can view and remove books from their saved list.

## Technologies

- **Frontend**:
  - React
  - React Router
  - Apollo Client
  - Bootstrap

- **Backend**:
  - Node.js
  - Express
  - Apollo Server
  - MongoDB
  - Mongoose
  - JSON Web Token (JWT)

- **GraphQL**:
  - GraphQL
  - graphql-tag

## Questions
Message me on GitHub! [mcaiati2](https://github.com/mcaiati2)

## License

This project is licensed under the MIT License.
