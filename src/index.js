"use strict";

const Splitter = require("./splitter");
const utils = require("./utils");

const splitter = Splitter();

const inst = (schema, utils) => {
  return vals => {
    // if args is single object do the parsing and rest
    // if args is array do inheritance
    utils.ext(strings, bindings);
    // parse
    // return instance
    return {};
  };
};

const jkt = (strings, ...bindings) => {
  // do validations of reserved words like toJSON, toString
  const schema = splitter(strings, bindings);
  const utils = utils.makeUtils(schema);
  return inst(schema, utils);
};

module.exports = jkt;
module.exports.Inst = inst;
