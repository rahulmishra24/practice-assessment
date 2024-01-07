const request = require('supertest');
const app = require('../index');  // Replace with the path to your Express app file

// Mocking the Note model
// Mock the Note model



jest.mock('../models/notes', () => {
    const Note = {
        find: jest.fn(),
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
        findOneAndDelete: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    };

    return Note;
});




jest.mock('../middleware/validateToken', () => ({
    verifyToken: jest.fn((req, res, next) => {
        req.user = { id: 'mockUserId', username: 'mockUser' };
        next();
    }),
}));


const Note = require('../models/notes');
describe('Notes API', () => {
    // Mock user data for testing
    const mockUser = { id: 'mockUserId' };

    // Mock note data for testing
    const mockNote = {
        _id: 'mockNoteId12345678987654',
        title: 'Test Note',
        content: 'This is a test note.',
        userId: mockUser.id,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /fetch', () => {
        it('should get all notes', async () => {
            await Note.find.mockResolvedValueOnce([mockNote]);

            const response = await request(app).get('/api/notes/fetch').set('user', JSON.stringify(mockUser));

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual([mockNote]);
            expect(Note.find).toHaveBeenCalledWith({ userId: mockUser.id });
        });

        // Add more test cases for error scenarios
    });

    describe('GET /fetch/:id', () => {
        it('should get a note by ID', async () => {
            Note.findOne.mockResolvedValueOnce(mockNote);

            const response = await request(app).get(`/api/notes/fetch/${mockNote._id}`).set('user', JSON.stringify(mockUser));

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockNote);
            expect(Note.findOne).toHaveBeenCalledWith({ _id: mockNote._id, userId: mockUser.id });
        });

        // Add more test cases for error scenarios
    });

    describe('POST /', () => {
        it('should create a new note', async () => {
            const newNote = { title: 'New Note', content: 'This is a new note.' };

            // Spy on the save method of the Note model
            const saveSpy = jest.spyOn(Note, 'create').mockResolvedValueOnce(newNote);

            const response = await request(app)
                .post('/api/notes/')
                .set('user', JSON.stringify(mockUser))  // Update with the actual token
                .send(newNote);

            console.log('Response:', response.body);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual({ message: 'Note created successfully' });
            // Verify that the save method was called with the correct arguments
            expect(saveSpy).toHaveBeenCalledWith({ ...newNote, userId: mockUser.id });

            // Restore the original save method
            saveSpy.mockRestore();

            // Add more test cases for error scenarios
        });
    });
    
    
    

    describe('PUT /:id', () => {
        it('should update a note by ID', async () => {
            const updatedNote = { title: 'Updated Note', content: 'This note has been updated.' };
            Note.findOneAndUpdate.mockResolvedValueOnce(mockNote);

            const response = await request(app)
                .put(`/api/notes/${mockNote._id}`)
                .set('user', JSON.stringify(mockUser))
                .send(updatedNote);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockNote);
            expect(Note.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: mockNote._id, userId: mockUser.id },
                updatedNote,
                { new: true }
            );
        });

        // Add more test cases for error scenarios
    });

    describe('DELETE /:id', () => {
        it('should delete a note by ID', async () => {
            Note.findOneAndDelete.mockResolvedValueOnce(mockNote);

            const response = await request(app).delete(`/api/notes/${mockNote._id}`).set('user', JSON.stringify(mockUser));

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ message: 'Note deleted successfully' });
            expect(Note.findOneAndDelete).toHaveBeenCalledWith({ _id: mockNote._id, userId: mockUser.id });
        });

        // Add more test cases for error scenarios
    });

    describe('POST /:id/share', () => {
        it('should share a note with another user', async () => {
            const sharedNote = { ...mockNote, sharedWith: 'anotherUserId' };
            Note.findOne.mockResolvedValueOnce(mockNote);

            const response = await request(app).post(`/api/notes/${mockNote._id}/share`).set('user', JSON.stringify(mockUser));

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockNote);
            expect(Note.findOne).toHaveBeenCalledWith({ _id: mockNote._id });
        });

        // Add more test cases for error scenarios
    });

    describe('GET /search', () => {
        it('should search for notes based on keywords', async () => {
            const searchQuery = 'test';
            const searchResults = [mockNote];
            Note.find.mockResolvedValueOnce(searchResults);

            const response = await request(app)
                .get('/api/notes/search')
                .set('user', JSON.stringify(mockUser))
                .query({ searchString: searchQuery });

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(searchResults);
            expect(Note.find).toHaveBeenCalledWith({ $text: { $search: searchQuery }, userId: mockUser.id });
        });

        // Add more test cases for error scenarios
    });
});
