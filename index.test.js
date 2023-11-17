const mockCreateTaskRes = {
    id: 1
}

jest.mock('./databaseFunctions.js', () =>{
    return {
            getTasks: jest.fn(),
            addTask: jest.fn().mockResolvedValue(mockCreateTaskRes),
            completeTask: jest.fn()
        }
});

const server = require('./index.js');

describe('Test command line parsing:', () => {
    
    test('Adding a task', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        await server.createTask('Test task');
        

        expect(consoleSpy).toHaveBeenCalledWith(`Task added with the ID of: ${mockCreateTaskRes.id}`);
    });
});