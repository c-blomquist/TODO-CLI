const { db, end } = require("./database.js");

/**
 * 
 * @param {string} taskName - The name of the task being added in 
 * @returns The id for the task that was created
 */
function addTask(taskName) {
  try {
    const query = `INSERT INTO task (name, completed, created_date)
                  VALUES ($1, false, NOW())
                  RETURNING id;`;

    return db.one(query, [taskName]);
  } catch (error) {
    throw error;
  } finally {
    end();
  }
}

/**
 * 
 * @returns Array of all tasks from the database table
 */
function getTasks() {
  try {
    const query = `SELECT id, name, completed 
                  FROM task;`;
    return db.manyOrNone(query);
  } catch (error) {
    throw error;
  } finally {
    end();
  }
}

/**
 * 
 * @param {string} taskID - ID of the task to be selected
 * @returns The task that has the inputted id
 */
function getTask(taskID) {
  try {
    const query = `SELECT id, completed
                  FROM task
                  WHERE id = $1;`;
    return db.one(query, [taskID]);
  } catch (error) {
    throw error;
  }
}

/**
 * 
 * @param {string} taskID - ID of the task to be completed 
 * @returns The id, completion status, and completion date of the task
 */
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
    return await db.one(query, [taskID]);
  } catch (error) {
    throw error;
  } finally {
    end();
  }
}

module.exports = {
  getTasks,
  addTask,
  completeTask,
};
