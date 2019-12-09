/*jshint esversion: 8 */

const logger = require("./logger");
const moment = require("moment");

/**
 * A date to timestamp.
 * @param {*} date commit.committer.date
 */
const toTimestamp = date => {
  return new Date(date).getTime() / 1000;
};

const nowTimestamp = () => {
  return toTimestamp(Date.now());
};

/**
 * Returns informtatoin about when the commit was done.
 *
 * Returns a json object like:
 *
 * {
 *  "commited":"2019-12-04T11:41:29Z",
 *  "commitedTimestamp":1575459689,
 *  "nowTimestamp":1575835581.242,
 *  "durationMs":375892.242000103,
 *  "readable":"4 days ago"
 * }
 *
 * @param {*} commit a git commit as json
 */
const when = commit => {
  let result;
  try {
    const commited = toTimestamp(commit.commit.committer.date);
    result = {
      commited: commit.commit.committer.date,
      commitedTimestamp: commited,
      nowTimestamp: nowTimestamp(),
      durationMs: nowTimestamp() - commited,
      readable: moment.unix(toTimestamp(commit.commit.committer.date)).fromNow()
    };
  } catch (e) {
    console.log("Error", e);
  }
  return result;
};

/**
 * Module exports
 */
module.exports = {
  when: when
};
