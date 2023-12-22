const { db, end } = require("./database.js");

// Takes in task name for creation and outputs the id of the created task
function addTask(taskName) {
  try {
    const query = `INSERT INTO task (name, completed, created_date)
                  VALUES ($1, false, NOW())
                  RETURNING id;`;

    return db.one(query, [taskName]);
  } catch (err) {
    throw err;
  } finally {
    end();
  }
}

function getTasks() {
  try {
    const query = `SELECT id, name, completed 
                  FROM task;`;
    return db.manyOrNone(query);
  } catch (err) {
    throw err;
  } finally {
    end();
  }
}

function getTask(taskID) {
  try {
    const query = `SELECT id, completed
                  FROM task
                  WHERE id = $1;`;
    return db.one(query, [taskID]);
  } catch (err) {
    throw err;
  }
}

async function completeTask(taskID) {
  try {
    const task = await getTask(taskID);
    if (task.completed == true) {
      throw new Error("Task is already completed!");
    }
    const query = `UPDATE task 
                  SET completed = true, completed_date = NOW()
                  WHERE id = $1
                  RETURNING name, completed, completed_date;`;
    return db.one(query, [taskID]);
  } catch (err) {
    throw err;
  } finally {
    end();
  }
}

module.exports = {
  getTasks,
  addTask,
  completeTask,
};
