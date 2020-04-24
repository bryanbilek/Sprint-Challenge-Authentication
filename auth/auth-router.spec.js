const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../api/server');

describe('server', function () {
    describe("POST /register req", function () {
        beforeEach(async () => {
          await db('users').truncate(); // empty the table and reset the id back to 1
        });
    
        it("return 201 on success", function () {
          return request(server)
            .post("/api/auth/register")
            .send({ username: 'kris', password: 'bryant' })
            .then(res => {
              expect(res.status).toBe(201);
            });
        });
    
        it('should return a message saying "Registration successful"', function () {
          return request(server)
            .post("/api/auth/register")
            .send({ username: 'kris', password: 'bryant' })
            .then(res => {
              expect(res.body.message).toBe('Registration successful');
            });
        });
     });
});