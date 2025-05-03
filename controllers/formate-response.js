function formatResponse({ contentType, statusCode, body, headers }) {
  return {
    Status: "success",
    Data: body,
    statusCode: statusCode || 200,
    headers: {
      "content-type": contentType || "application/json",
      ...(headers || {})
    }
  };
}

function formatError({ error }) {
  return {
    Status: "error",
    Error: {
      message: error.message || "Internal Server Error",
      name: error.name || "UnknownError",
      code: error.errorCode || "PA-99999"
    },
    statusCode: error.httpStatusCode || 500,
    headers: {
      "content-type": "application/json"
    }
  };
}

module.exports = { formatResponse, formatError };
