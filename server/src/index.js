// make bluebird default Promise
require("dotenv").config();

Promise = require("bluebird"); // eslint-disable-line no-global-assign
const app = require("./configs/express");
const ConnectDB = require("./configs/mongoose");
const logger = require("./configs/winton");

// open mongoose connection
ConnectDB();

const port = process.env.APP_PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
/**
 * Exports express
 * @public
 */
module.exports = app;
