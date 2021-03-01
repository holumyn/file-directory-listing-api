const appRoot = require("app-root-path");
const userHandler = require(`${appRoot}/api/controllers/userController`);

module.exports = function userRoute(router) {
  router.route("/").get(userHandler.welcome);

  router.route("/get-directories").post(userHandler.getDirectories);
};
