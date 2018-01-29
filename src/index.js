"use strict";

const Splitter = require("./splitter");
const utils = require("./utils");

const splitter = Splitter();

const inst = (schema, utils) => {
  return (...vals) => {
    if (utils.detect.isObject(vals[0])) {
      const parsed = utils.parse(vals);
      return {
        ...parsed,
        schema,
        toJSON: () => utils.serialize(parsed),
        toString: () => JSON.stringify(utils.serialize(parsed))
      };
    } else {
      // do validations of reserved words like toJSON, toString
      return utils.ext(...vals)
    }
  };
};

const jkt = (strings, ...bindings) => {
  // do validations of reserved words like toJSON, toString
  const schema = splitter(strings, bindings);
  return inst(schema, utils.makeUtils(schema));
};

module.exports = jkt;
module.exports.Inst = inst;
