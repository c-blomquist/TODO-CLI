var pgp = require('pg-promise')();
const db = pgp(/* Insert in the database connection here for use */);

// TODO: Setup remote database connection instead of just locally hosted
// TODO: check for internet connection to be able to grab items from database

if(process.argv.length < 3){
    console.error("Please input a command.");
}

// lists all tasks and their status, example: node index.js list 
if(process.argv[2] === "list"){
    getTasks();
}

// create a new task, example: node index.js create "This is my new task"
if(process.argv[2] === "create"){
    if(!process.argv[3]){
        console.error("Please enter a task name to create.")
    }

    // TODO: Should add in some sort of check that the task name being passed in works 

    addTask(process.argv[3]);
}

if(process.argv[2] === "complete"){
    if(!process.argv[3]){
        console.error("Please enter a task to be marked as complete.")
    }
    // TODO: add in call to post update to task to mark as completed
    // TODO: logic to not allow completing a task that doesnt exist
    // TODO: logic to not allow completing an already completed task
}

// Takes in task name for creation and outputs the id of the created task
async function addTask(taskName) {
    try {
        const query = `INSERT INTO task (name, completed, createddate)
                        VALUES ($1, false, NOW())
                        RETURNING id;`;

        const res = await db.one(query, [taskName]);
        console.log(`Task added with the ID of: ${res.id}`);
    }
    catch (err) {
        console.error("Error adding in task: " + err);
    }
    finally {
        pgp.end();
    }
}

async function getTasks() {
    try {
        const query = `SELECT id, name, completed FROM task;`;
        const res = await db.manyOrNone(query);

        if(res.length == 0) {
            console.log("No tasks were found in database.");
        }
        else { 
            res.forEach(task => {console.log(`ID: ${task.id}, Task name: ${task.name}, Completion status: ${task.completed}`);});
        }
    }
    catch (err) {
        console.error("Error being able to get tasks: " + err)
    }
    finally {
        pgp.end();
    }
}