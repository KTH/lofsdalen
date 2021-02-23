/*jshint esversion: 8 */

const express = require("express");
const defaultEnvs = require("@kth/default-envs");
const httpResponse = require("@kth/http-responses");
const app = express();
const git = require("./modules/git");
const about = require("./config/version");
const { log } = require("./modules/logger");

const { templates } = require("@kth/basic-html-templates");
const controller = require("./modules/controller");
const os = require("os");
const started = new Date();

/**
 * Let the package @kth/http-responses use the Tamarack log.
 */
httpResponse.setLogger(log);

/**
 * Process env:s that are not configured on start up, but accessed
 * as envs in the application are added with there default values.
 *
 * They are also logged.
 *
 * This way you will always have a value for process.env.X
 */
defaultEnvs.set(
  {
    PORT: 80,
    LOG_LEVEL: "info",
    PATH_PREFIX: "/api/lofsdalen",
    APPINSIGHTS_INSTRUMENTATIONKEY: "",
  },
  log
);

/**
 * Start the server on configured port.
 */
app.listen(process.env.PORT, function () {
  log.info(
    `Started '${about.dockerName}:${
      about.dockerVersion
    }' on '${os.hostname()}:${process.env.PORT}'`
  );
});

/********************* routes **************************/

/**
 * Index page.
 */
app.get(`${process.env.PATH_PREFIX}/`, function (request, response) {
  httpResponse.ok(
    request,
    response,
    templates.index((title = "Lofsdalen - Git commit helper"))
  );
});

/**
 * Gets the full information about a commit as json.
 *
 * http://localhost:3000/api/lofsdalen/v1/lofsdalen/4b1c21f
 *
 */
app.get(
  `${process.env.PATH_PREFIX}/v1/:repoName/:commit`,
  async function (request, response) {
    const { repoName, commit } = request.params;
    const commitJson = await git.getCommit(repoName, commit);

    if (commitJson) {
      httpResponse.ok(
        request,
        response,
        commitJson,
        httpResponse.contentTypes.JSON
      );
    } else {
      httpResponse.notFound(
        request,
        response,
        {
          Message: `Cound not find any commit matching '${repoName}' and hash  '${commit}'.`,
        },
        httpResponse.contentTypes.JSON
      );
    }
  }
);

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
app.get(
  `${process.env.PATH_PREFIX}/v1/:repoName/:commit/when`,
  async function (request, response) {
    const { repoName, commit } = request.params;
    const commitJson = await git.getCommit(repoName, commit);

    if (commitJson) {
      httpResponse.ok(
        request,
        response,
        controller.when(commitJson),
        httpResponse.contentTypes.JSON
      );
    } else {
      httpResponse.notFound(
        request,
        response,
        {
          Message: `Cound not find any commit matching '${repoName}' and hash  '${commit}'.`,
        },
        httpResponse.contentTypes.JSON
      );
    }
  }
);

/**
 * Health check route.
 */
app.get(`${process.env.PATH_PREFIX}/_monitor`, function (request, response) {
  httpResponse.ok(
    request,
    response,
    templates._monitor((status = "OK")),
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

/**
 * About page. Versions and such.
 */
app.get(`${process.env.PATH_PREFIX}/_about`, function (request, response) {
  httpResponse.ok(request, response, templates._about(about, started));
});

/**
 * Crawler access definitions.
 */
app.get(`${process.env.PATH_PREFIX}/robots.txt`, function (request, response) {
  httpResponse.ok(
    request,
    response,
    templates.robotstxt(),
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

/**
 * Ignore favicons.
 */
app.get("${process.env.PATH_PREFIX}/favicon.ico", function (request, response) {
  httpResponse.noContent(request, response);
});

/**
 * Default route, if no other route is matched (404 Not Found).
 */
app.use(function (request, response) {
  httpResponse.notFound(request, response, templates.error404());
});
