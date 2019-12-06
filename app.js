/*jshint esversion: 8 */

const express = require("express");
const app = express();
const api = require("./modules/api");
const about = require("./config/version");
const logger = require("./modules/logger");
const httpResponse = require("./modules/httpResponse.js");
const templates = require("./modules/templates");
const os = require("os");
const packageFile = require("./package.json");

/**
 * Start server on port 80, or use port specifed in env PORT.
 */
app.getListenPort = function() {
  return process.env.PORT ? process.env.PORT : 80;
};

/**
 * Start the server on configured port.
 */
app.listen(app.getListenPort(), function() {
  logger.log.info(
    `Started ${packageFile.name} on ${os.hostname()}:${app.getListenPort()}`
  );
});

/********************* routes **************************/

/**
 * Index page.
 */
app.get("/api/lofsdalen", function(request, response) {
  httpResponse.ok(request, response, templates.index());
});

/**
 * About page. Versions and such.
 */
app.get("/api/lofsdalen/v1/:name/:commit", async function(request, response) {
  const json = await api.getGitCommit(
    request.params.name,
    request.params.commit
  );

  httpResponse.ok(
    request,
    response,
    json,
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

/**
 * About page. Versions and such.
 */
app.get("/api/lofsdalen/v1/:name/:commit/date", async function(
  request,
  response
) {
  const json = await api.getGitCommit(
    request.params.name,
    request.params.commit
  );

  if (json) {
    httpResponse.ok(
      request,
      response,
      json.commit.committer.date,
      httpResponse.contentTypes.PLAIN_TEXT
    );
  } else {
    httpResponse.notFound(
      request,
      response,
      { Message: "Not Found" },
      httpResponse.contentTypes.JSON
    );
  }
});

/**
 * Health check route.
 */
app.get("/api/lofsdalen/_monitor", function(request, response) {
  httpResponse.ok(
    request,
    response,
    templates._monitor(),
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

/**
 * Information about the application.
 */
app.get("/api/lofsdalen/_about", function(request, response) {
  httpResponse.ok(
    request,
    response,
    templates._about(),
    httpResponse.contentTypes.HTML
  );
});

/**
 * Crawler access definitions.
 */
app.get("/api/lofsdalen/robots.txt", function(request, response) {
  httpResponse.ok(
    request,
    response,
    templates.robotstxt(),
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

/**
 * Default route, if no other route is matched (404 Not Found).
 */
app.use(function(request, response) {
  httpResponse.notFound(request, response, templates.error404());
});
