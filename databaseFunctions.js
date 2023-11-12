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


module.exports = {
    getTasks,
    addTask
}