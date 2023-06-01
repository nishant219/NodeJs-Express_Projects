# Task Manager Backend

This is the backend project for a task manager application. It provides API endpoints to manage tasks, including getting all tasks, getting a single task by ID, deleting a task by ID, and updating a task.


## Installation

1. Clone the repository:.
. ```bash
   git clone https://github.com/url.git
2. Insatall the dependencies:
.    cd taskManager
      npm install
3. Set up the environment variables:
   Create a .env file in the root directory and provide the variables



## API Endpoints
--> Get all tasks 
Endpoint: GET /tasks
Description: Retrieves all tasks from the database.

--> Get a single task
Endpoint: GET /tasks/:id
Description: Retrieves a task by its ID.
Parameters:
id (string): The ID of the task to retrieve.

--> Delete a task
Endpoint: DELETE /tasks/:id
Description: Deletes a task by its ID.
Parameters:
id (string): The ID of the task to delete.

--> Update a task
Endpoint: PATCH /tasks/:id
Description: Updates a task by its ID.
Parameters:
id (string): The ID of the task to update.
Request Body:
name (string, optional): The updated name of the task.
completed (boolean, optional): The updated completion status of the task.
Response:
Status code: 200 OK
Body: The updated task object

## Technologies Used
Node.js
Express.js
MongoDB
Mongoose