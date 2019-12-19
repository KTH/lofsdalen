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
app.pathPrefix = function() {
  return process.env.PATH_PREFIX ? process.env.PATH_PREFIX : "/api/lofsdalen";
};

/**
 * Start server on port 80, or use port specifed in env PORT.
 */
app.port = function() {
  return process.env.PORT ? process.env.PORT : 80;
};

/**
 * Start the server on configured port.
 */
app.listen(app.port(), function() {
  logger.log.info(
    `Started ${packageFile.name} on ${os.hostname()}:${app.port()}`
  );
});

/********************* routes **************************/

/**
 * Index page.
 */
app.get(`${app.pathPrefix}`, function(req, response) {
  httpResponse.ok(req, response, templates.index());
});

/**
 * Gets the full information about a commit as json.
 *
 * http://localhost:3000/api/lofsdalen/v1/lofsdalen/4b1c21f
 *
 */
app.get(`${app.pathPrefix}/v1/:repoName/:commit`, async function(req, res) {
  const { repoName, commit } = req.params;
  const commitJson = await git.getCommit(repoName, commit);

  if (commitJson) {
    httpResponse.ok(req, res, commitJson);
  } else {
    httpResponse.notFound(
      req,
      res,
      {
        Message: `Cound not find any commit matching '${repoName}' and hash  '${commit}'.`
      },
      httpResponse.contentTypes.JSON
    );
  }
});

/**
 * Get information about when the commit happend.
 *
 * http://localhost:3000/api/lofsdalen/v1/lofsdalen/4b1c21f/when
 *
 * E.h:
 * {
 *  "commited":"2019-12-04T11:41:29Z",
 *  "commitedTimestamp":1575459689,
 *  "nowTimestamp":1576754084.048,
 *  "durationMs":1294395.0480000973,
 *  "readable":"15 days ago"
 * }
 */
app.get(`${app.pathPrefix()}/v1/:repoName/:commit/when`, async function(
  req,
  res
) {
  const { repoName, commit } = req.params;
  const commitJson = await git.getCommit(repoName, commit);

  if (commitJson) {
    httpResponse.ok(req, res, controller.when(commitJson));
  } else {
    httpResponse.notFound(
      req,
      res,
      {
        Message: `Cound not find any commit matching '${repoName}' and hash  '${commit}'.`
      },
      httpResponse.contentTypes.JSON
    );
  }
});

/**
 * Health check route.
 */
app.get(`${app.pathPrefix}/_monitor`, function(req, res) {
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
app.get(`${app.pathPrefix}/_about`, function(req, res) {
  httpResponse.ok(req, res, templates._about(), httpResponse.contentTypes.HTML);
});

/**
 * Crawler access definitions.
 */
app.get(`${app.pathPrefix}/robots.txt`, function(req, res) {
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
