/*jshint esversion: 8 */

const https = require("https");
const logger = require("./logger");
const httpResponse = require("./httpResponse");
const fetch = require("node-fetch");

const getUrl = (name, commit) => {
  return `https://api.github.com/repos/KTH/${name}/commits/${commit}`;
};

const _getGitCommit = async (name, commit) => {
  const response = await fetch(getUrl(name, commit), {
    method: "get",
    headers: {
      "User-Agent": "github.com/KTH/lofsdalen"
    }
  });
  if (response.status === httpResponse.statusCodes.OK) {
    return response.json();
  }
  return undefined;
};

/**
 * Module exports
 */
module.exports = {
  getGitCommit: _getGitCommit
};
