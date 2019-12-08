/*jshint esversion: 8 */

const https = require("https");
const logger = require("./logger");
const httpResponse = require("./httpResponse");
const fetch = require("node-fetch");

const FETCH_OPTIONS = {
  method: "get",
  headers: {
    "User-Agent": "github.com/KTH/lofsdalen"
  }
};

//https://api.github.com/repos/lofsdalen/commits/4b1c21f
const GITHUB = "https://api.github.com";

//https://gita.sys.kth.se/api/v3/repos/Infosys/aktivitetstillfallen/commits/a3195a7
const GITHUB_PRIVATE = "https://gita.sys.kth.se/api/v3";

const getCommitUrl = (name, commit, private = false) => {
  const urlPrefix = private ? GITHUB_PRIVATE : GITHUB;
  return getUrl(urlPrefix, name, commit);
};

const getUrl = (urlPrefix, name, commit) => {
  return `${urlPrefix}/repos/KTH/${name}/commits/${commit}`;
};

// https://gita.sys.kth.se/api/v3/repos/Infosys/aktivitetstillfallen/commits/a3195a7

/**
 * Read from public repos first and if that does not return any commit data,
 * try reading from the private git repo.
 * @param {*} name
 * @param {*} commit
 */
const getCommit = async (name, commit) => {
  let json = await getPublicCommit(name, commit);
  if (json) {
    return json;
  }
  return undefined;
  // Later when implemting client cert auth...
  /*
  json = await getPrivateCommit(name, commit);
  console.log("Private resonse", json);
  return json;
  */
};

const getPublicCommit = async (name, commit) => {
  let result;
  try {
    const response = await fetch(getCommitUrl(name, commit), FETCH_OPTIONS);
    if (response.status === httpResponse.statusCodes.OK) {
      result = response.json();
    }
  } catch (e) {
    logger.log.error("Error to get public commit", e);
  }

  return result;
};

const getPrivateCommit = async (name, commit) => {
  let result;
  try {
    const response = await fetch(
      getCommitUrl(name, commit, true),
      FETCH_OPTIONS
    );
  } catch (e) {
    logger.log.error("Got an error when fetching private comit info.", e);
  }

  return result;
};

/**
 * Module exports
 */
module.exports = {
  getCommit: getCommit
};
