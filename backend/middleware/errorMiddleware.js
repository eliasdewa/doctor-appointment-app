const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  switch (statusCode) {
    case 400:
      res.status(statusCode).json({
        success: "false",
        statusCode,
        error: "Validation Failed",
        message
      });
      break;
    case 401:
      res
        .status(statusCode)
        .json({
          success: "false",
          statusCode,
          error: "Unauthorized",
          message
        });
      break;
    case 403:
      res
        .status(statusCode)
        .json({
          success: "false",
          statusCode,
          error: "Forbidden",
          message
        });
      break;
    case 404:
      res
        .status(statusCode)
        .json({
          success: "false",
          statusCode,
          error: "Not Found",
          message
        });
      break;
    case 500:
      res
        .status(statusCode)
        .json({
          success: "false",
          statusCode,
          error: "Server Error",
          message
        });
      break;
    default:
      console.log("No Error, All good!");
      break;
  }
};

export default errorMiddleware;
