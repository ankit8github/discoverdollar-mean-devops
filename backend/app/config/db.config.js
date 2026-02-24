//updating the db.config.js file to use environment variables for the MongoDB connection URL. 
//This allows for better security and flexibility when deploying the application in different environments (development, staging, production). 
//The connection URL can be set in the environment variables, and if not set, it will default to "mongodb://localhost:27017/dd_db".
module.exports = {
  url: process.env.MONGO_URL || "mongodb://localhost:27017/dd_db"
};