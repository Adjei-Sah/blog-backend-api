import app from './app';

const port = process.env.API_PORT || 3000;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
