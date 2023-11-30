const db = require("./databaseFunctions.js");

// TODO: Setup remote database connection instead of just locally hosted
// TODO: check for internet connection to be able to grab items from database

async function listTasks() {
  await db
    .getTasks()
    .then((res) => {
      if (res.length == 0) {
        console.log("No tasks were found in database.");
      } else {
        res.forEach((task) => {
          console.log(
            `ID: ${task.id}, Task name: ${task.name}, Completion status: ${task.completed}`
          );
        });
      }
    })
    .catch((err) => {
      console.error("Error with tasks returned: " + err);
    });
}

async function createTask(taskName) {
  if (!taskName) {
    console.error("Please enter a task name to create.");
  }
  if (typeof taskName !== "string") {
    console.error("Please give the name of the task as a string.");
  } else {
    await db
      .addTask(taskName)
      .then((res) => {
        console.log(`Task added with the ID of: ${res.id}`);
      })
      .catch((err) => {
        console.error("Error with adding a task: " + err);
      });
  }
}

async function completeTask(taskID) {
  if (!taskID) {
    console.error("Please enter a task to be marked as complete.");
  }
  if (!/^\d+$/.test(taskID)) {
    console.error("Please enter the task ID number that you want to complete.");
  } else {
    await db
      .completeTask(taskID)
      .then((res) => {
        console.log(`Task ${res.name} completed on: ${res.completed_date}.`);
      })
      .catch((err) => {
        console.error("Error with completing a task: " + err);
      });
  }
}

if (process.argv.length < 3) {
  console.error("Please input a command.");
}

// lists all tasks and their status, example: node index.js list
if (process.argv[2] === "list") {
  listTasks();
}

// create a new task, example: node index.js create "This is my new task"
if (process.argv[2] === "create") {
  createTask(process.argv[3]);
}

// complete a new task, example: node index.js complete 1
if (process.argv[2] === "complete") {
  completeTask(process.argv[3]);
}

module.exports = {
  createTask,
  listTasks,
  completeTask,
};
