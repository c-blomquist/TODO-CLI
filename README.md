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

## Setup Guide
Clone the repository and add in a credentials.json file with the format of:
```
{
    "username": [insert username for database here],
    "password": [insert password for database here],
    "host": [insert host location here],
    "database": [insert database name here]
}
``` 
PostgreSQL is used for the database, and you set up your own database if needed, or reach out for the credentials needed if you are a developer on the project.

## Data Model
A task object should have the following shape:
```
interface Task {
	id: string;
	name: string;
	completed: boolean;
	created_date: Date;
	completed_date: Date;
}
```
