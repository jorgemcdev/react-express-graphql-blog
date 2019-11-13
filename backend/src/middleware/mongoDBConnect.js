/* eslint-disable no-console */
import mongoose from 'mongoose';

import { MONGO_URI } from '../config';

const mongoDBConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🚀 DB Connected!');
  } catch (err) {
    console.log(`💥 DB Connection Error: ${err.message}`);
  }
};

export default mongoDBConnect;
