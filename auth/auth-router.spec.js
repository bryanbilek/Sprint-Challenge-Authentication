const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../api/server');

describe('server', function () {
    describe("POST for /register & /login requests", function () {
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

        it("not providing both credentials should be status 401", function () {
            return request(server)
              .post("/api/auth/login")
              .send({ username: 'kris' })
              .then(res => {
                expect(res.status).toBe(401);
              });
          });
      
          it('should return a message saying "Invalid username or password"', function () {
            return request(server)
              .post("/api/auth/login")
              .send({ username: 'kris' })
              .then(res => {
                expect(res.body.message).toBe('Invalid username or password');
              });
          });
     });
});