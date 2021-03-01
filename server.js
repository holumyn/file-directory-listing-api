const express = require("express");
const port = 3002;

const dotenv = require("dotenv-flow").config();
if (dotenv.error) {
  throw dotenv.error;
}
const app = express();

const appRoot = require("app-root-path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = express.Router();
app.use("/", router);

const userRoute = require(`${appRoot}/api/routes/userRoute`);
userRoute(router);

app.listen(port, () => {
  console.log(`Directory listing API started at http://localhost:${port}`);
});

module.exports = app;
