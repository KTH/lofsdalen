/*jshint esversion: 8 */

const express = require("express");
const app = express();
const git = require("./modules/git");
const about = require("./config/version");
const logger = require("./modules/logger");
const httpResponse = require("./modules/httpResponse.js");
const templates = require("./modules/templates");
const controller = require("./modules/controller");
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
app.get("/api/lofsdalen", function(req, response) {
  httpResponse.ok(req, response, templates.index());
});

/**
 * About page. Versions and such.
 */
app.get("/api/lofsdalen/v1/:name/:commit", async function(req, response) {
  const { repositoryName, commit } = req.params;
  const commitJson = await git.getCommit(repositoryName, commit);

  if (commitJson) {
    httpResponse.ok(req, res, controller.when(commitJson));
  } else {
    httpResponse.notFound(
      req,
      res,
      {
        Message: `Cound not find any commit matching '${repositoryName}' and hash  '${commit}'.`
      },
      httpResponse.contentTypes.JSON
    );
  }
});

/**
 * About page. Versions and such.
 */
app.get("/api/lofsdalen/v1/:repositoryName/:commit/when", async function(
  req,
  res
) {
  const { repositoryName, commit } = req.params;
  const commitJson = await git.getCommit(repositoryName, commit);

  if (commitJson) {
    httpResponse.ok(req, res, controller.when(commitJson));
  } else {
    httpResponse.notFound(
      req,
      res,
      {
        Message: `Cound not find any commit matching '${repositoryName}' and hash  '${commit}'.`
      },
      httpResponse.contentTypes.JSON
    );
  }
});

/**
 * Health check route.
 */
app.get("/api/lofsdalen/_monitor", function(req, res) {
  httpResponse.ok(
    req,
    res,
    templates._monitor(),
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

/**
 * Information about the application.
 */
app.get("/api/lofsdalen/_about", function(req, res) {
  httpResponse.ok(req, res, templates._about(), httpResponse.contentTypes.HTML);
});

/**
 * Crawler access definitions.
 */
app.get("/api/lofsdalen/robots.txt", function(req, res) {
  httpResponse.ok(
    req,
    res,
    templates.robotstxt(),
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

/**
 * Default route, if no other route is matched (404 Not Found).
 */
app.use(function(req, res) {
  httpResponse.notFound(req, res, templates.error404());
});
