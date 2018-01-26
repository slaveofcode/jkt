"use strict";

const Splitter = require("./splitter");
const utils = require("./utils");

const splitter = Splitter();

const jkt = (strings, ...bindings) => {
  const schema = splitter(strings, bindings);
  const obj = Object.assign({}, schema, { util: utils.makeUtils(schema) });
  return obj;
};

module.exports = jkt;
