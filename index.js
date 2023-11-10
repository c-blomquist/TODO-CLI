const {db, end} = require('./database.js');

// TODO: Setup remote database connection instead of just locally hosted
// TODO: check for internet connection to be able to grab items from database

if(process.argv.length < 3){
    console.error("Please input a command.");
}

// lists all tasks and their status, example: node index.js list 
if(process.argv[2] === "list"){
    getTasks().then(res => {
        if(res.length == 0) {
            console.log("No tasks were found in database.");
        }
        else { 
            res.forEach(task => {console.log(`ID: ${task.id}, Task name: ${task.name}, Completion status: ${task.completed}`);});
        }
    }).catch(err => {
        console.error("Problem with tasks returned: " + err);
    });
}

// create a new task, example: node index.js create "This is my new task"
if(process.argv[2] === "create"){
    if(!process.argv[3]){
        console.error("Please enter a task name to create.");
    }
    if(typeof(process.argv[3]) != String){
        console.error("Please give the name of the task as a string.")
    } 



    addTask(process.argv[3]).then(res => {
        console.log(`Task added with the ID of: ${res.id}`);
    }).catch(err => {
        console.error("Problem with adding a task: "+ err);
    });
}

if(process.argv[2] === "complete"){
    if(!process.argv[3]){
        console.error("Please enter a task to be marked as complete.");
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
        return res;
    }
    catch (err) {
        console.error("Error adding in task: " + err);
        throw err;
    }
    finally {
        end();
    }
}

async function getTasks() {
    try {
        const query = `SELECT id, name, completed 
                        FROM task;`;
        const res = await db.manyOrNone(query);
        return res;
    }
    catch (err) {
        console.error("Error being able to get tasks: " + err);
        throw err;
    }
    finally {
        end();
    }
}


module.exports = {
    getTasks,
    addTask
}