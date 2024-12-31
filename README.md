# Todo API

Todo API is a simple and efficient backend API for managing tasks, built with Node.js, Express, and MongoDB.

## Features
- User registration and authentication (using JWT).
- CRUD operations for tasks.
- Secure password storage with bcrypt.
- Token-based authentication for protected routes.

## Prerequisites
Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or hosted)

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/todo_api.git
   cd todo_api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```plaintext
   PORT=5000
   MONGO_URI=YOUR_MONGO_URL
   JWT_SECRET=your_jwt_secret_key
   ```
   Replace `MONGO_URI` with your MongoDB connection string and `JWT_SECRET` with a secure secret key.

## Running the Project
1. **Start MongoDB:**
   Ensure your MongoDB server is running locally or accessible via the connection string in `MONGO_URI`.

2. **Run the server in development mode:**
   ```bash
   npm run dev
   ```
   This will start the server with `nodemon` for automatic restarts during development.

3. **Run the server in production mode:**
   ```bash
   npm run run
   ```
   This starts the server without automatic restarts.

4. **API will be available at:**
   ```
   http://localhost:5000
   ```

## API Endpoints

### Authentication Routes
- **POST** `/auth/signup` - Register a new user.
- **POST** `/auth/login` - Log in an existing user.

### Task Routes (Protected)
- **GET** `/tasks` - Fetch all tasks for the logged-in user.
- **GET** `/tasks/:id` - Fetch a task by ID.
- **POST** `/tasks` - Create a new task.
- **PUT** `/tasks/:id` - Update a task.
- **DELETE** `/tasks/:id` - Delete a task.

> **Note**: Protected routes require a Bearer token in the `Authorization` header.

### Example Request

#### Login
```bash
curl -X POST http://localhost:5000/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "password123"}'
```

#### Create Task
```bash
curl -X POST http://localhost:5000/tasks \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"title": "New Task", "description": "Description of the task"}'
```

## Project Structure
```
todo_api/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── task.controller.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── task.model.js
│   │   ├── user.model.js
│   ├── routes/
│   │   ├── index.routers.js
│   │   ├── tasks.routes.js
│   ├── index.js
├── .env
├── package.json
├── README.md
```

## Development Notes
- Use `nodemon` for automatic restarts during development.
- Follow RESTful API standards for consistency.

## Author
**Ashwani Kharwar**  
Feel free to reach out for any questions or feedback.

## License
This project is licensed under the ISC License.

