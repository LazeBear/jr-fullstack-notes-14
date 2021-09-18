const mongoose = require('mongoose');

const connectToDB = () => {
  if (!process.env.CONNECTION_STRING) {
    console.error('connection string not defined');
    // 正常退出
    // 非正常退出
    // 人为正常退出
    // process.exit(0);
    // 人为非正常退出
    process.exit(1);
  }
  const connectionString = process.env.CONNECTION_STRING;
  const db = mongoose.connection;
  db.on('connected', () => {
    console.log(`DB connected, ${connectionString}`);
  });
  db.on('error', (error) => {
    console.error(error.message);
    process.exit(1);
  });
  db.on('disconnected', () => {
    console.log('mongodb connection lost');
  });

  return mongoose.connect(connectionString);
};

module.exports = connectToDB;
