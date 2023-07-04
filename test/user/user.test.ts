import request from 'supertest';

import app from '../../src/app';
import { setupDb, teardownDb } from '../../src/setupTestDb';

beforeAll(async () => {
  await setupDb;
});

afterAll(async () => {
  await teardownDb;
});

// describe('POST /api/vi/user/register', () => {
//   it('responds with a Error Message', async () => {
//     request(app)
//     .post('/api/v1/users/register');
//   });
// });