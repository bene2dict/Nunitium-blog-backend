import constants from "../constants.js";

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  const showStack = process.env.NODE_ENV === "development";

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: error.message,
        ...(showStack && { stackTrace: error.stack }),
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: error.message,
        ...(showStack && { stackTrace: error.stack }),
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: error.message,
        ...(showStack && { stackTrace: error.stack }),
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: error.message,
        ...(showStack && { stackTrace: error.stack }),
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: error.message,
        ...(showStack && { stackTrace: error.stack }),
      });
      break;
    default:
      console.log("No Error, All good");
      break;
  }
};

export default errorHandler;
