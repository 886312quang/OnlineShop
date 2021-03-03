const mongoose = require("mongoose");
const bluebird = require("bluebird");

const logger = require("./winton");

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
let connectDB = () => {
  mongoose.Promise = bluebird;

  let URI = process.env.MONGO_URI;

  // Exit application on error
  mongoose.connection.on("error", (err) => {
    logger.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
  });

  mongoose
    .connect(URI, {
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));

  return mongoose.connection;
};

module.exports = connectDB;
