import { TestDataSource } from './database/data-source';

export const setupDb = TestDataSource.initialize()
  .then(async () => {
    console.log('Database connection success');
  })
  .catch((err) => console.error(err));

export const teardownDb = TestDataSource.dropDatabase();