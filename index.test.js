const mockCreateTaskRes = {
    id: 1
}

const mockTaskOne = {
    id: 1,
    name: 'Test One',
    completed: false,
    createddate: new Date(),
    completeddate: undefined,
}

const mockTaskTwo = {
    id: 2,
    name: 'Test Two',
    completed: true,
    createddate: new Date(),
    completeddate: new Date(),
}

jest.mock('./databaseFunctions.js', () =>{
    return {
            getTasks: jest.fn().mockResolvedValue([mockTaskOne, mockTaskTwo]),
            addTask: jest.fn().mockResolvedValue(mockCreateTaskRes),
            completeTask: jest.fn().mockResolvedValue(mockTaskTwo)
        }
});
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
const server = require('./index.js');
const functions = require('./databaseFunctions.js');

describe('Test command line parsing:', () => {

    afterEach(() =>{
        jest.clearAllMocks();
    });

    describe(`Testing createTask`, () => {
        test('Adding a task', async () => {
            await server.createTask('Test task');
            
            expect(consoleLogSpy).toHaveBeenCalledWith(`Task added with the ID of: ${mockCreateTaskRes.id}`);
        });

        test('No task name inputted', async () => {
            await server.createTask();
            expect(consoleErrorSpy).toHaveBeenCalledWith("Please enter a task name to create.");
        });

        test('Error adding a task', async () => {
            functions.addTask.mockRejectedValueOnce(new Error('Error adding task'));

            await server.createTask('Test task');

            expect(consoleErrorSpy).toHaveBeenCalledWith('Error with adding a task: Error: Error adding task')
        });
    });

    describe('Testing listing tasks', () => {
        test('Listing tasks', async () => {
        
            await server.listTasks();
        
            expect(consoleLogSpy).toHaveBeenCalledTimes(2);
            expect(consoleLogSpy.mock.calls[0]).toContain(`ID: ${mockTaskOne.id}, Task name: ${mockTaskOne.name}, Completion status: ${mockTaskOne.completed}`);
            expect(consoleLogSpy.mock.calls[1]).toContain(`ID: ${mockTaskTwo.id}, Task name: ${mockTaskTwo.name}, Completion status: ${mockTaskTwo.completed}`)
        });
    
        test(`error getting tasks to print`, async () => {
            functions.getTasks.mockRejectedValueOnce(new Error('Error getting tasks'));
            
            await server.listTasks();
            
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error with tasks returned: Error: Error getting tasks');
        });

        test(`no tasks found`, async () => {
            jest.mocked(functions).getTasks.mockResolvedValueOnce([]);

            await server.listTasks();

            expect(consoleLogSpy).toHaveBeenCalledWith("No tasks were found in database.");
        });
    });

    describe('Testing completeTask', () => {
        test('Succesful task completion', async () => {
            await server.completeTask(2);
            
            expect(consoleLogSpy).toHaveBeenCalledWith(`Task ${mockTaskTwo.name} completed on: ${mockTaskTwo.completeddate}.`)
        });
        
        test('No id inputted for task completion', async () => {
            await server.completeTask();

            expect(consoleErrorSpy).toHaveBeenCalledWith("Please enter a task to be marked as complete.")
        });

        test('Inputted ID was not an integer error', async () => {
            await server.completeTask("test");

            expect(consoleErrorSpy).toHaveBeenCalledWith("Please enter the task ID number that you want to complete.");
        });

        test('Inputted ID was below 0, therefore not a taskID', async () => {
            await server.completeTask(-1);

            expect(consoleErrorSpy).toHaveBeenCalledWith("Please enter the task ID number that you want to complete.");
        });

        test('Error completing db.completeTask', async () => {
            jest.mocked(functions).completeTask.mockRejectedValueOnce(new Error("Error completing task"));

            await server.completeTask(2);

            expect(consoleErrorSpy).toHaveBeenCalledWith('Error with completing a task: Error: Error completing task')
        })
    });
});