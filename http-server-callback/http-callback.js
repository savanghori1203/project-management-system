const config = require('../config')
const Logger = require('../utilities/logger')
const logger = new Logger(config.loggingOptions)

module.exports = function makeHttpCallback({
  controller
}) {
  return async function httpCallback(req, res) {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: req.headers,
      logger,
      files: req.files,
      hostname: req.hostname,
    };

    try {

      const httpResponse = await controller(httpRequest);

      const { statusCode, headers, ...responseBody } = httpResponse

      if (httpResponse.headers) {
        for (const [header, value] of Object.entries(httpResponse.headers)) {
          res.setHeader(header, value);
        }
      }

      // Handle response based on status codes
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
        return res.status(httpResponse.statusCode).json(responseBody);
      } else if ([301, 302, 307, 308].includes(httpResponse.statusCode)) {
        return res.redirect(httpResponse.statusCode, responseBody);
      } else if (httpResponse.statusCode === 404) {
        return res.status(404).json(responseBody);
      } else {
        return res.status(httpResponse.statusCode || 500).json(responseBody);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message || "Internal Server Error" });
    }
  };
};
