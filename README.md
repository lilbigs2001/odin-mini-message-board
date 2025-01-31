# Message Board

A simple message board application built with **TDD (Test-Driven Development)**, **Express.js**, and **EJS**. This project allows users to write and display messages on a home page, demonstrating backend functionality and server side rendering with a focus on writing clean, maintainable code.

## Features

- **Message submission**: Users can submit new messages along with a username.
- **Message display**: Submitted messages are displayed on the homepage.
- **Page navigation**: Links for navigating between pages, including a dedicated form page for creating new messages.

## Technologies Used

- **Node.js** and **Express**: For building the backend API and handling routing.
- **EJS**: Templating engine for rendering dynamic content.
- **Jest**: For testing the application with a focus on test-driven development (TDD).
- **Cheerio**: For parsing and querying HTML in tests.
- **Supertest**: For making HTTP requests in the test suite.

## Development Process

This project was developed using **Test-Driven Development (TDD)** to ensure reliable, bug-free code. The key steps include:

1. Writing tests to define functionality.
2. Implementing features to make the tests pass.
3. Refactoring code while ensuring the tests continue to pass.

## Running the Project

To run the project locally:

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/message-board.git

2. Install the dependencies:

    ```bash
    cd message-board
    npm install

3. Start the server:
    ```bash
    npm start

4. Run the tests:
    ```bash
    npm test
