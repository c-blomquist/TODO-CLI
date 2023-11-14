const {db, end} = require('./database.js');

// Takes in task name for creation and outputs the id of the created task
async function addTask(taskName) {
    try {
        const query = `INSERT INTO task (name, completed, createddate)
                        VALUES ($1, false, NOW())
                        RETURNING id;`;

        const res = await db.one(query, [taskName]);
        console.log(res);
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

async function getTask(taskID) {
    try {
        const query = `SELECT id, completed
                        FROM task
                        WHERE id = $1;`;
        const res = await db.one(query, [taskID]);
        return res;
    }
    catch (err) {
        console.error("Error getting a task by ID: " + err);
        throw err;
    }
    finally{
        end();
    }

}

async function completeTask(taskID) {
    try {
        const task = await getTask(taskID);
        if(task.completed == true) {
            console.error("Task is already completed!");
            throw new Error('Task is already completed!');
        }
        const query = `UPDATE task
                        SET completed = true, completeddate = NOW()
                        WHERE id = $1
                        RETURNING name, completed, completeddate;`;
        const res = await db.one(query, [taskID]);
        return res;
    }
    catch (err) {
        console.error("Error being able to complete task: " + err);
        throw err;
    }
    finally {
        end();
    }
}

module.exports = {
    getTasks,
    addTask,
    completeTask
}