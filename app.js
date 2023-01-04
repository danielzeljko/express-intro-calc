/** Simple demo Express app. */

const express = require("express");
const { findMean, findMedian, findMode } = require('./stats');
const { convertStrNums, writeToFile } = require("./utils");
const { BadRequestError } = require("./expressError");
const app = express();

// useful error class to throw
const { NotFoundError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {

  if (!req.query.nums) throw new BadRequestError("nums are required.");

  const numbers = convertStrNums(req.query.nums.split(","));
  const result = { operation: "mean", value: findMean(numbers) };

  if ('save' in req.query && req.query.save === 'true') {
    writeToFile(result);
  }

  return res.json(result);
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {

  const numbers = convertStrNums(req.query.nums.split(","));
  const result = { operation: "median", value: findMedian(numbers) };

  if ('save' in req.query && req.query.save === 'true') {
    writeToFile(result);
  }

  return res.json(result);
});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {

  const numbers = convertStrNums(req.query.nums.split(","));
  const result = { operation: "mode", value: findMode(numbers) };

  if ('save' in req.query && req.query.save === 'true') {
    writeToFile(result);
  }

  return res.json(result);
});

/** Finds mode, median, mean of nums in qs: returns {
  operation: "all",
  mean: 12
  median: 10,
  mode: 8
} */

app.get("/all", function (req, res) {

  const numbers = convertStrNums(req.query.nums.split(","));
  const mode = findMode(numbers);
  const mean = findMean(numbers);
  const median = findMedian(numbers);

  const result = { operation: "all", mean, median, mode };

  if ('save' in req.query && req.query.save === 'true') {
    writeToFile(result);
  }

  return res.json(result);
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;