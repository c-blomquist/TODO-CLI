const server = require("./databaseFunctions.js");

// TODO: Setup remote database connection instead of just locally hosted
// TODO: check for internet connection to be able to grab items from database

if(process.argv.length < 3){
    console.error("Please input a command.");
}

// lists all tasks and their status, example: node index.js list 
if(process.argv[2] === "list"){
    server.getTasks().then(res => {
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

    server.addTask(process.argv[3]).then(res => {
        console.log(`Task added with the ID of: ${res.id}`);
    }).catch(err => {
        console.error("Problem with adding a task: "+ err);
    });
}

if(process.argv[2] === "complete"){
    if(!process.argv[3]){
        console.error("Please enter a task to be marked as complete.");
    }

    if(typeof(process.argv[3]) != Number){
        console.error("Please enter the task ID number that you want to complete.");
    }
    
    server.completeTask(process.argv[3]).then(res => {
        console.log(`Task ${res.name} completed on: ${res.completeddate}.`);
    }).catch(err => {
        console.error("Problem with completing a task: " + err);
    });
}