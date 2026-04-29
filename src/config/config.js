require("dotenv").config();

const DbConfig = {
  mongoDBUrl: process.env.MONGODB_URL,
  mongoDBName: process.env.MONGODB_NAME,
}

module.exports = { DbConfig };