

// TODO: create database connection with PostgreSQL
// TODO: check for internet connection to be able to grab items from database

if(process.argv.length < 3){
    console.error("Please input a command.");
}

// lists all tasks and their status, example: node index.js list 
if(process.argv[2] === "list"){
    // TODO: add in call to database to get all list objects
}

// create a new task, example: node index.js create "This is my new task"
if(process.argv[2] === "create"){
    if(!process.argv[3]){
        console.error("Please enter a task name to create.")
    }
    // TODO: add in call to post task to database.
}

if(process.argv[2] === "complete"){
    if(!process.argv[3]){
        console.error("Please enter a task to be marked as complete.")
    }
    // TODO: add in call to post update to task to mark as completed
    // TODO: logic to not allow completing a task that doesnt exist
    // TODO: logic to not allow completing an already completed task
}