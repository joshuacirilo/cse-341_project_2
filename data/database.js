const dotenv = require('dotenv');
const dns = require('dns');
const { MongoClient } = require('mongodb');

dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1']);

let database;

const initDB = async (callback) => {
  if (database) {
    return callback(null, database);
  }

  try {
    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL is not defined in the .env file');
    }

    const client = new MongoClient(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();

    database = client.db('project2');
    return callback(null, database);
  } catch (err) {
    return callback(err);
  }
};

const getDb = () => {
  if (!database) {
    throw new Error('Database has not been initialized. Call initDB first.');
  }

  return database;
};

module.exports = {
  initDB,
  getDb,
};
