import 'dotenv/config';
import app from './app';
import { loadKeys } from './utils';

(async () => {
  console.log('loading keys...');
  await loadKeys();
})();

const port = process.env.HTTP_PORT!;
app.listen(port, (e) => {
  if (e) {
    console.error(e);
    process.exit(1);
  }
  console.log(`running on port ${port}...`);
});
