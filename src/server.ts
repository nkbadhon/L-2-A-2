import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  // using try catch method to find out error if occurs
  try {
    // Connection with mongoDB
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
