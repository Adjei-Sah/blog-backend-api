import app from './app';
import { AppDataSource } from './database/data-source';

const port = process.env.API_PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connection success');
  })
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
