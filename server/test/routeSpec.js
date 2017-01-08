import app from '../app.js';
import request from 'supertest';
import { expect } from 'chai';

describe('typeahead test', () => {
  it('expect GET /resolver?text=San Francisco,US to return 200', (done) => {
    request(app)
      .get('/resolver?text=San Francisco,US')
      .expect(200, done);
  });
});

describe('resolver test', () => {
  it('expect GET /resolver?text=San Francisco,US to return 200', (done) => {
    request(app)
      .get('/resolver?text=San Francisco,US')
      .expect(200, done);
  });
});