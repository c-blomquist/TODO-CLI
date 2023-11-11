const mockTestTask = {
    id: 1,
    name: 'Test Task',
    completed: false,
    createdData: new Date(),
    completedDate: new Date()
};

jest.mock('./database', () => {
    return {
        db: {
            manyOrNone: jest.fn().mockResolvedValue([mockTestTask])
        },
        end: jest.fn()
    }
});

const server = require('./index.js');
const { db } = require('./database');

// TODO test on a testing database
// TODO adding in another test causes it to fail as the connection to the datbase has been closed already.

describe('TODO CLI Tests', () => {

    test('Getting all tasks', async () => {
        const res = await server.getTasks();
        expect(res).toBeDefined();
        expect(res).toEqual([mockTestTask])
    });

    describe('Getting tasks fails', () => {
        beforeAll(() => {
            jest.mocked(db).manyOrNone.mockRejectedValueOnce(new Error('This is a test error!'));
        })

        test('should throw error', async () => {
            await expect(() => server.getTasks()).rejects.toEqual(new Error('This is a test error!'))
        })
    })

    // TODO: Try to fix database connection to be able to run multiple tests
    // test('Inputting an empty name', async () => {
    //     await expect(server.addTask(undefined)).rejects.toThrow(new"Error adding in task:");
    // });
});
