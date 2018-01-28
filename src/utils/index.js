"use strict";

const extendUtil = require("./extends");
const parserUtil = require("./parser");
const serializerUtil = require("./serializer");

const makeUtils = schema => {
  return {
    ext: extendUtil(schema),
    parse: parserUtil(schema),
    serialize: serializerUtil()
  };
};

module.exports = {
  makeUtils
};
