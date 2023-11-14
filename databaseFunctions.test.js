const mockTestTask = {
    id: 1,
    name: 'Test Task',
    completed: false,
    createdData: new Date(),
    completedDate: new Date()
};

const mockAddTask = {
    id: 2
};

const mockCompletedTestTask = {
    id: 1,
    name: 'Test Task',
    completed: true,
    createdData: new Date(),
    completedDate: new Date()
};

// mock of database module to "simulate" database entry and retrival
jest.mock('./database', () => {
    return {
        db: {
            manyOrNone: jest.fn().mockResolvedValue([mockTestTask]),
            one: jest.fn().mockResolvedValue(mockAddTask)
        },
        end: jest.fn()
    }
});

const server = require('./databaseFunctions.js');
const { db } = require('./database');


describe('Database functions unit tests', () => {

    test('Getting all tasks', async () => {
        const res = await server.getTasks();
        expect(res).toBeDefined();
        expect(res).toEqual([mockTestTask]);
    })

    describe('Getting tasks fails', () => {
        beforeAll(() => {
            jest.mocked(db).manyOrNone.mockRejectedValueOnce(new Error('This is a test error!'));
        })

        test('Error throw check', async () => {
            await expect(() => server.getTasks()).rejects.toEqual(new Error('This is a test error!'));
        })
    })

    test('Adding a task', async () => {
        const res = await server.addTask("Test Task");
        expect(res).toBeDefined();
        expect(res).toEqual(mockAddTask);
    })

    describe('Adding task fails', () => {
        beforeAll(() => {
            jest.mocked(db).one.mockRejectedValueOnce(new Error('The input was undefined!'));
        })

        test('Undefined input', async () => {
            await expect(() => server.addTask(undefined)).rejects.toEqual(new Error('The input was undefined!'));
        })
    });

    test('Completing a task', async () => {
        jest.mocked(db).one.mockResolvedValueOnce(mockTestTask);
        jest.mocked(db).one.mockResolvedValueOnce(mockCompletedTestTask);

        const res = await server.completeTask(1);
        expect(res).toBeDefined;
        expect(res.name).toEqual("Test Task");
        expect(res.completed).toEqual(true);
    });
});
