const db = require("./databaseFunctions.js");

async function listTasks() {
  try {
    const res = await db.getTasks();
    if (res.length == 0) {
      console.log("No tasks were found in database.");
    } else {
      res.sort((a, b) => a.id - b.id);
      res.forEach((task) => {
        console.log(
          `ID: ${task.id}, Task name: ${task.name}, Completion status: ${task.completed}`
        );
      });
    }
  } catch (error) {
    console.error("Error with tasks returned: " + error);
  }
}

async function createTask(taskName) {
  if (!taskName) {
    console.error("Please enter a task name to create.");
  } else if (typeof taskName !== "string") {
    console.error("Please give the name of the task as a string.");
  } else {
    try {
      const res = await db.addTask(taskName);
      console.log(`Task added with the ID of: ${res.id}`);
    } catch (error) {
      console.error("Error with adding a task: " + error);
    }
  }
}

async function completeTask(taskID) {
  if (!taskID) {
    console.error("Please enter the ID of a task to be marked as complete.");
  } else if (!/^\d+$/.test(taskID)) {
    console.error("Please enter the task ID number that you want to complete.");
  } else {
    try {
      const res = await db.completeTask(taskID);
      console.log(`Task ${res.name} completed on: ${res.completed_date}.`);
    } catch (error) {
      console.error("Error completing selected task: " + error);
    }
  }
}

if (process.argv.length < 3) {
  console.error("Please input a command.");
} else if (process.argv[2] === "list") {
  listTasks();
} else if (process.argv[2] === "create") {
  createTask(process.argv[3]);
} else if (process.argv[2] === "complete") {
  completeTask(process.argv[3]);
} else {
  console.error("Incorrect command inputted.");
}

module.exports = {
  createTask,
  listTasks,
  completeTask,
};
