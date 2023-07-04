import { TestDataSource } from './database/data-source';

global.afterAll(async () => {
  await TestDataSource.dropDatabase();
});