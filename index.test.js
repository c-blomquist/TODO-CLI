const server = require('./index.js');

// TODO test on a testing database
// TODO adding in another test causes it to fail as the connection to the datbase has been closed already.

describe('TODO CLI Tests', () => {

    test('Getting all tasks', async () => {
        const res = await server.getTasks();

        expect(res).toBeDefined();
    });

    // TODO: Try to fix database connection to be able to run multiple tests
    // test('Inputting an empty name', async () => {
    //     await expect(server.addTask(undefined)).rejects.toThrow("Error adding in task:");
    // });
});
