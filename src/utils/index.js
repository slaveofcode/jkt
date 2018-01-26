"use strict";

const extendUtil = require("./extends");
const parserUtil = require("./parser");

const makeUtils = schema => {
  return {
    ext: extendUtil(schema),
    parse: parserUtil(schema)
  };
};

module.exports = {
  makeUtils
};
