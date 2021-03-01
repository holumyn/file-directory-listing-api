const appRoot = require("app-root-path");
const fs = require("fs");
const path = require("path");
const constants = require(`${appRoot}/api/constants/Constants`);

exports.welcome = async function welcome(req, res) {
  try {
    const server_name = process.env.SERVER_NAME;
    return res.status(constants.HTTP_STATUS.OK.CODE).json({
      message: `Welcome to ${server_name}`,
    });
  } catch (error) {
    return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE).json({
      message: "An error occured during welcome",
      error: error.message,
    });
  }
};

exports.getDirectories = async function getDirectories(req, res) {
  try {
    // const rootPath = "/Users/olumide/Documents/projects";
    const { path } = req.body;

    const fileNames = await fs.promises.readdir(path);
    const filePaths = fileNames.map((fileName) =>
      path.join(rootPath, fileName)
    );
    const filePathsAndIsDirectoryFlagsPromises = filePaths.map(
      async (filePath) => ({
        path: filePath,
        isDirectory: (await fs.promises.stat(filePath)).isDirectory(),
      })
    );
    const filePathsAndIsDirectoryFlags = await Promise.all(
      filePathsAndIsDirectoryFlagsPromises
    );
    const getDirectories = filePathsAndIsDirectoryFlags
      .filter(
        (filePathAndIsDirectoryFlag) => filePathAndIsDirectoryFlag.isDirectory
      )
      .map((filePathAndIsDirectoryFlag) => filePathAndIsDirectoryFlag.path);
    return res.status(constants.HTTP_STATUS.OK.CODE).send(getDirectories);
  } catch (error) {
    return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE).json({
      message: "An error occured during welcome",
      error: error.message,
    });
  }
};
