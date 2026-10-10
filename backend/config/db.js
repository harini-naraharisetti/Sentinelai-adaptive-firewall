const mongoose = require('mongoose');

// ANSI color helpers
const green = '\x1b[32m';
const cyan = '\x1b[36m';
const yellow = '\x1b[33m';
const red = '\x1b[31m';
const reset = '\x1b[0m';
const bold = '\x1b[1m';

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sentinelai_db';

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 4000
    });
    console.log(`[${green}DATABASE${reset}] ${bold}🟢 MongoDB Connected:${reset} ${cyan}${conn.connection.host}:${conn.connection.port}/${conn.connection.name}${reset}`);
  } catch (error) {
    console.error(`[${red}DATABASE${reset}] ${bold}⚠️ MongoDB Connection Warning:${reset} ${yellow}${error.message}${reset}`);
    console.log(`[${cyan}DATABASE${reset}] 💡 Tip: Verify local MongoDB daemon is active on port 27017 / 27010.`);
  }
};

module.exports = connectDB;
