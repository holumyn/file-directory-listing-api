const appRoot = require("app-root-path");
const proxyquire = require("proxyquire");
const sinon = require("sinon");
const constants = require(`${appRoot}/api/constants/Constants`);

const sandbox = sinon.createSandbox();

describe("UserController", () => {
  let userController;
  let req;
  let res = {};
  let resObj;

  beforeEach(() => {
    resObj = {
      json: sandbox.spy(),
      send: sandbox.spy(),
    };

    res = {
      status: sandbox.stub().returns(resObj),
    };

    const imports = {};
    userController = proxyquire(
      `${appRoot}/api/controllers/userController`,
      imports
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Welcome", async () => {
    it("returns welcome message", async () => {
      process.env.SERVER_NAME = "Directory Listing API Server";
      await userController.welcome(req, res);
      sandbox.assert.calledWith(res.status, 200);
      sandbox.assert.calledWith(resObj.json, {
        message: `Welcome to ${process.env.SERVER_NAME}`,
      });
    });
  });
});
