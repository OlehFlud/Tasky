
# Tasky - Real-Time Task Management Backend

Tasky is a backend server designed for a real-time task management system using **Socket.IO** and **Express**. The server is built using **TypeScript** and handles task management, user authentication, and notifications in real time. It uses **MongoDB** as the database and has built-in features for email notifications and security.

## Features

- Real-time communication with Socket.IO
- User authentication with JWT
- Task management with MongoDB
- Rate-limiting and security with Helmet
- Email notifications via Nodemailer and Pug templates

## Getting Started

### Prerequisites

Ensure that you have the following installed:

- **Node.js** (>= 14.x)
- **npm** (>= 6.x)
- **MongoDB** (for database operations)
- **TypeScript**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/tasky.git
   cd tasky
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of your project and add the necessary environment variables:

   ```
   PORT=3000
   DB_URI=mongodb://localhost:27017/tasky
   JWT_SECRET=your_secret_key
   ```

4. Build the project:

   ```bash
   npm run build
   ```

### Development

To start the development server with hot-reloading:

```bash
npm run start
```

Or, to run the server in watch mode:

```bash
npm run start:watch
```

### Linting & Formatting

- To lint the code and auto-fix issues:

  ```bash
  npm run lint
  ```

- To format the code using Prettier:

  ```bash
  npm run format
  ```

### Running in Production

To build and start the project for production:

```bash
npm run build
npm start
```

### Testing

(Currently, no tests are defined. You can add tests by modifying the `test` script in `package.json`.)

## Scripts

- **start**: Cleans up, builds the project, and starts the server in production mode.
- **start:watch**: Starts the server in watch mode with hot reloading.
- **build**: Cleans up and compiles the TypeScript code.
- **lint**: Runs ESLint and auto-fixes any issues.
- **format**: Formats the code using Prettier.
- **tsc**: Watches the TypeScript code for changes and compiles it.

## Dependencies

- **express**: Backend framework for building APIs.
- **socket.io**: For real-time communication.
- **mongoose**: MongoDB ORM.
- **jsonwebtoken**: For handling JWT authentication.
- **nodemailer**: For sending email notifications.
- **helmet**: Adds security headers to the Express server.
- **rate-limiter**: For limiting the rate of requests to the server.

## Author

- **Flud Oleh**

## License

This project is licensed under the **ISC** license.
