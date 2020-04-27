const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../api/server');
const axios = require('axios');

describe('GET for /api/jokes', function() {
    it('should return status 400 w/out logging in because of authentication', function() {
      return request(server)
        .get('/api/jokes')
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it('should return message saying "Please provide credentials" due to not logging in', function() {
        return request(server)
          .get('/api/jokes')
          .then(res => {
            expect(res.body.message).toBe('Please provide credentials');
          });
      });
});