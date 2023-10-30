# TODO-CLI
For the first phase of the project, the developer should construct a command-line tool that allows a user to create new tasks and complete them with the following commands.

```bash
# list all tasks and their status (incomplete or complete)
node index.js list

# create a new task, should log out the tasks ID after creation
node index.js create "This is my new task"

# complete a task, replace ${TASK_ID} with the id of the task you want to complete
node index.js complete ${TASK_ID}
```

The CLI should connect to a remotely-hosted database of your choosing (PostgreSQL and MongoDB are popular ones) to preserve tasks.

******************************Acceptance Criteria******************************

- The project should be built in NodeJS
- The following commands should execute successfully and behave as outlined in the guidelines
- Created and completed tasks should be saved to a database
- The repository should have a minimum unit test coverage of 80% (files, branches, statements). Jest is a popular testing framework for NodeJS.
- The CLI should respond with appropriate error messages and NOT CRASH. The following are examples of errors that should be handled but it is not an exhaustive list:
    - No internet access
    - Malformed command
    - Trying to complete a task that does not exist
    - Trying to complete a task that is already complete
